import dotenv from "dotenv";
dotenv.config();
import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import { APP_DISPLAY_NAME, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./constants";
import path from "path";
import mainStore from "./models/MainStore";

import "./ipcHandlers";
import { IpcCommandsToRenderer, MainStoreKeys } from "./shared/types/ipc";
import { getSpecialIpcName } from "./utils/format";

const instanceLock = app.requestSingleInstanceLock();

const createMainWindow = async (): Promise<void> =>
{
  console.log(`is dev? > ${isDev}`);
  const win = new BrowserWindow({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    resizable: true,
    title: APP_DISPLAY_NAME,
    //frame: true,
    //transparent: true,
    icon: path.join(__dirname, "static/icon.ico"),
    webPreferences: {
      devTools: isDev ? true : false,
      preload: path.join(app.getAppPath(), "preload.js"),
      contextIsolation: true,
    },
  });

  const productionFile = `file://${__dirname}/index.html`;
  if (!isDev)
  {
    win.webContents.on("devtools-opened", () =>
    {
      win.webContents.closeDevTools();
    });
  }
  const debugPort = process.env.RENDERER_PORT;
  win.loadURL(isDev ? `http://localhost:${debugPort}` : productionFile);
  mainStore[MainStoreKeys.mainWindow] = win;
  mainStore[MainStoreKeys.Test] = "I'm from main store!";
  setInterval(() =>
  {
    //The way send data from main to renderer
    //You can check how to deal sent data in the renderer at /next/src/index.tsx
    win.webContents.send(getSpecialIpcName(IpcCommandsToRenderer.HeapUsed, "unique"), process.memoryUsage().heapUsed);
  }, 1000);
  if (isDev)
  {
    try
    {
      const extenstionName = await (<Promise<string>>(
        installExtension(REACT_DEVELOPER_TOOLS)
      ));
      console.log(`The extension, ${extenstionName} has installed`);
    } catch (err)
    {
    }
  }
};

app.on("quit", (event: Electron.Event, code: number) =>
{
  console.log(`The app has been quit, code : ${code}`);
});
process.on("uncaughtException", (err: Error) =>
{
  console.log(`The app has been quit by uncaughtException, ${err.message}`);
});

if (instanceLock)
{
  app.on(
    "second-instance",
    () =>
    {
      const window = mainStore[MainStoreKeys.mainWindow] as BrowserWindow;
      if (window)
      {
        if (window.isMinimized())
          window.restore();
        window.focus();
      }
    }
  );
  app.on("ready", createMainWindow);
} else
{
  app.quit();
}
