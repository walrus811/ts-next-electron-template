export enum IpcCommandsToMain
{
  MinimizeApp = "minimize-app",
  NormalizeApp = "normalize-app",
  MaximizeApp = "maximize-app",
  CloseApp = "close-app",
  MainStore = "main-store"
}

export enum IpcCommandsToRenderer
{
  HeapUsed = "heap-used",
}

export enum MainStoreKeys
{
  mainWindow = "mainWindow",
  Test = "test",
}