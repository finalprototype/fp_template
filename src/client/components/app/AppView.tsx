import React, { Suspense, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as actions from '../../store/app/slice';
import Loader from '../ui/Loader';
import AppRouter from './AppRouter';

import styles from './__styles__/AppView.scss';

const mapDispatch = { ...actions };
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const AppView: React.FunctionComponent<PropsFromRedux> = ({ init }: PropsFromRedux) => {
  useEffect(() => {
    if (!window.config) return;
    const { config } = window;
    init({
      env: config.env,
      version: config.version,
      assetsPath: config.assets_path,
      manifest: { ...config.manifest },
      flags: [...config.flags],
    });
    delete window.config;
  }, [init]);

  const suspenseFallback = (
    <Loader className={styles['suspense-loader']} />
  );

  return (
    <div className={styles.content}>
      <Suspense fallback={suspenseFallback}>
        <AppRouter />
      </Suspense>
    </div>
  );
};

export default connector(AppView);
