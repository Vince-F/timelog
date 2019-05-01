import { Settings } from "../models/settings";

export interface ISettingsManager {
    retrieveOrCreate(userId: string): Promise<Settings>;
    update(userId: string, settings: Settings): Promise<Settings>;
}