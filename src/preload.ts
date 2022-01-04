import { contextBridge, ipcRenderer } from "electron"
import { getSpecialIpcName } from "./utils/format";

contextBridge.exposeInMainWorld("ipc", {
  electronIpcSend: (channel: string, ...arg: any) => {
    ipcRenderer.send(channel, arg)
  },
  electronIpcInvokeSync: (channel: string, ...arg: any) => {
    return ipcRenderer.invoke(channel, arg)
  },
  electronIpcOn: (
    channel: string,
    refresh: boolean,
    listener: (event: Electron.IpcRendererEvent, ...arg: any) => void
  ) => {
    const listenerCount = ipcRenderer.listenerCount(channel)
    if (refresh) {
      ipcRenderer.removeAllListeners(channel)
    }
    if (listenerCount > 1) return
    ipcRenderer.on(channel, listener)
  },

  electronIpcOnWithSalt: (
    baseChannel: string,
    salt: string,
    refresh: boolean,
    listener: (event: Electron.IpcRendererEvent, ...arg: any) => void
  ) => {
    const channelName = getSpecialIpcName(baseChannel, salt)
    const listenerCount = ipcRenderer.listenerCount(channelName)
    if (refresh) {
      ipcRenderer.removeAllListeners(channelName)
    }
    if (listenerCount > 1) return
    ipcRenderer.on(channelName, listener)
  },
  electronIpcOnce: (
    channel: string,
    listener: (event: Electron.IpcRendererEvent, ...arg: any) => void
  ) => {
    ipcRenderer.once(channel, listener)
  },
  electronIpcRemoveListener: (
    channel: string,
    listener: (event: any, ...arg: any) => void
  ) => {
    ipcRenderer.removeListener(channel, listener)
  },
  electronIpcRemoveAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel)
  },
  electronIpcRemoveAllListenersWithSalt: (
    baseChannel: string,
    salt: string
  ) => {
    const channelName = getSpecialIpcName(baseChannel, salt)
    ipcRenderer.removeAllListeners(channelName)
  },
})
