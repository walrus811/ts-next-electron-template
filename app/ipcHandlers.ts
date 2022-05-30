import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { APP_DISPLAY_NAME, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./constants";
import mainStore from "./models/MainStore";
import { IpcCommandsToMain, MainStoreKeys } from "./shared/types/ipc";

ipcMain.on(
  IpcCommandsToMain.MinimizeApp,
  function onIpcMinimizeApp()
  {
    const window = mainStore[MainStoreKeys.mainWindow] as BrowserWindow;
    window?.minimize();
  }
);

ipcMain.on(
  IpcCommandsToMain.NormalizeApp,
  function onIpcNormalizeApp()
  {
    const window = mainStore[MainStoreKeys.mainWindow] as BrowserWindow;
    window?.unmaximize();
    window?.setSize(DEFAULT_WIDTH, DEFAULT_HEIGHT);
  }
);

ipcMain.on(
  IpcCommandsToMain.MaximizeApp,
  function onIpcMaximizeApp()
  {
    const window = mainStore[MainStoreKeys.mainWindow] as BrowserWindow;
    window?.maximize();
  }
);

ipcMain.on(
  IpcCommandsToMain.CloseApp,
  function onIpcCloseApp()
  {
    const window = mainStore[MainStoreKeys.mainWindow] as BrowserWindow;
    if (!window)
      return;
    const response = dialog.showMessageBoxSync(
      window,
      {
        type: "question",
        message: `do you want to quit ${APP_DISPLAY_NAME}?`,
        title: APP_DISPLAY_NAME,
        buttons: ["yes", "no"],
      }
    );
    if (response === 0)
    {
      app.quit();
    }
  }
);

ipcMain.handle(
  IpcCommandsToMain.MainStore,
  function onMainStore(_: Event, key: string)
  {
    return mainStore[key];
  }
);