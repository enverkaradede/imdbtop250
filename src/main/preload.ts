import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  getMovieById: (id: number) => ipcRenderer.invoke('movie:getById', id),
  getUnwatchedMovies: () => ipcRenderer.invoke('movie:unwatched'),
  updateIsWatched: (id: number, isWatched: boolean) =>
    ipcRenderer.invoke('movie:updateIsWatched', { id, isWatched }),
  getMovieList: () => ipcRenderer.invoke('movie:all'),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
