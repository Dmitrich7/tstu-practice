/// <reference types="react-scripts" />
export interface IElectronAPI {
    sendClose: () => Promise<void>,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
