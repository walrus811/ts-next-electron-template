import { BrowserWindow } from "electron";

class MainStore
{
  mainWindow: BrowserWindow | null = null;

}

const mainStore = new MainStore();

export default mainStore;