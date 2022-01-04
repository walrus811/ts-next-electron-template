import dotenv from "dotenv";
dotenv.config();
import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import { APP_DISPLAY_NAME, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./constants";
import path from "path";

const instanceLock = app.requestSingleInstanceLock();

const createMainWindow = async (): Promise<void> =>
{
  console.log("나는 살아있어요!");
  console.log(isDev);
  let win = new BrowserWindow({
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
    //우회해서 여는 방법이 존재한다고 하니 혹시 몰라 닫아줌.
    win.webContents.on("devtools-opened", () =>
    {
      win.webContents.closeDevTools();
    });
  }
  const debugPort = process.env.RENDERER_PORT;
  win.loadURL(isDev ? `http://localhost:${debugPort}` : productionFile);
  if (isDev)
  {
    try
    {
      const extenstionName = await (<Promise<string>>(
        installExtension(REACT_DEVELOPER_TOOLS)
      ));
    } catch (err)
    {
    }
  }
};

app.on("quit", (event: Electron.Event, code: number) =>
{
});
process.on("uncaughtException", (err: Error) =>
{
});

if (instanceLock)
{
  app.on(
    "second-instance",
    (
      event: Electron.Event,
      commandLine: Array<string>,
      workingDirectory: string
    ) =>
    {
      /*
      if (ProgramState.mainWindow)
      {
        if (ProgramState.mainWindow.isMinimized())
          ProgramState.mainWindow.restore();
        ProgramState.mainWindow.focus();
      }
       */
    }
  );

  app.on("ready", createMainWindow);
} else
{
  app.quit();
}
