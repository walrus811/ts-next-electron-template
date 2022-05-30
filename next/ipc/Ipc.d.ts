type IpcRendererListener = (event: Event, ...arg: Array<unknown>) => void;

interface IpcActions
{
  electronIpcSend: (channel: string, ...args: Array<unknown>) => void;
  electronIpcInvoke: (channel: string, ...args: Array<unknown>) => Promise<unknown>;
  electronIpcMainStore: (key: MainStoreKeys) => Promise<unknown>;
  electronIpcOn: (channel: string, refresh: boolean, listener: IpcRendererListener) => void;
  electronIpcOnWithSalt: (baseChannel: string, salt: string, refresh: boolean, listener: IpcRendererListener) => void;
  electronIpcOnce: (channel: string, refresh: boolean, listener: IpcRendererListener) => void;
  electronIpcRemoveListener: (channel: string, ...args: IpcRendererListener) => void;
  electronIpcRemoveAllListeners: (channel: string) => void;
  electronIpcRemoveAllListenersWithSalt: (baseChannel: string, salt: string) => void;
}