interface Window {
  config: Config;
}

interface Config {
  manifest: Manifest;
  env: string;
  version: string;
  assets_path: string;
  flags: string[];
}

interface Manifest {
  [key: string]: string|string[];
}
