import keyMirror from '../../utils/keyMirror';

export default keyMirror([
  'APP_INIT_CONFIG',
]);

export interface AppState {
  isReady: boolean;
  config: AppConfig;
}

// Interfaces
export interface AppConfig {
  env: string;
  version: string;
  assetsPath: string;
  manifest: { [key: string]: string|string[] };
  flags: string[];
}

export interface AppAction {
  type: string;
  payload?: { [key: string]: string|undefined };
}
