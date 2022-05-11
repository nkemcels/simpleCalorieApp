import { app, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';
import { IPC_PATHS } from '../bridge/ipcConstants';

const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
};

export class IPCMain {
    static init() {
        ipcMain.on(IPC_PATHS.GET_ASSET_DATA, (evt, assetName) => {
            const assetPath = getAssetPath(...assetName.split('/'));
            fs.readFile(assetPath, (err, data) => {
                if (err) evt.sender.send(IPC_PATHS.GET_ASSET_DATA_RESULT, { type: 'error', data: `${err}` });
                else evt.sender.send(IPC_PATHS.GET_ASSET_DATA_RESULT, { type: 'success', data: data.toString('utf8') });
            });
        });

        ipcMain.on(IPC_PATHS.GET_ASSET_SVG_ICON_PATHS, (evt, assetName) => {
            const assetPath = getAssetPath('svgs');
            fs.readdir(assetPath, (err, data) => {
                if (err) evt.sender.send(IPC_PATHS.GET_ASSET_SVG_ICON_PATHS_RESULT, { type: 'error', data: `${err}` });
                else
                    evt.sender.send(IPC_PATHS.GET_ASSET_SVG_ICON_PATHS_RESULT, {
                        type: 'success',
                        data: data.map((t) => path.join(assetPath, t)),
                    });
            });
        });
    }
}
