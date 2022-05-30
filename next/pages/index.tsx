import type { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  IpcCommandsToMain,
  IpcCommandsToRenderer,
  MainStoreKeys,
} from "../../app/shared/types/ipc";

const ipcSalt = "unique";

const Home: NextPage = () => {
  const [mainStoreTestValue, setMainStoreTestValue] = useState("");
  const [heapUsed, setHeapUsed] = useState(0);

  useEffect(() => {
    (function attachIpcs() {
      window.ipc.electronIpcOnWithSalt(
        IpcCommandsToRenderer.HeapUsed,
        ipcSalt,
        true,
        function onHeapUsed(_: Event, data: unknown) {
          const used = data as number;
          if (used) setHeapUsed(used);
        }
      );
    })();
    //You should remove ipc for detached component for memory management
    return function detachIpcs() {
      window.ipc.electronIpcRemoveAllListenersWithSalt(
        IpcCommandsToRenderer.HeapUsed,
        ipcSalt
      );
    };
  });

  return (
    <>
      <h1>Electron with Next.js and Typescript! 🚀🚀🚀</h1>
      <h3>used heap from main ({heapUsed}bytes)</h3>
      <button
        onClick={() => {
          window.ipc.electronIpcSend(IpcCommandsToMain.MaximizeApp);
        }}
      >
        maximize window
      </button>
      <button
        onClick={() => {
          window.ipc.electronIpcSend(IpcCommandsToMain.MinimizeApp);
        }}
      >
        minimize window
      </button>
      <button
        onClick={() => {
          window.ipc.electronIpcSend(IpcCommandsToMain.NormalizeApp);
        }}
      >
        normalize window
      </button>
      <button
        onClick={() => {
          window.ipc.electronIpcSend(IpcCommandsToMain.CloseApp);
        }}
      >
        close app
      </button>
      <button
        onClick={async () => {
          const value = (await window.ipc.electronIpcMainStore(
            MainStoreKeys.Test
          )) as string;
          setMainStoreTestValue(value);
        }}
      >
        get test value from main store by key({`${mainStoreTestValue}`})
      </button>
    </>
  );
};

export default Home;
