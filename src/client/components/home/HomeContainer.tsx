import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import Loader from '../ui/Loader';

import './__styles__/HomeContainer.scss';

const Home: React.FunctionComponent = () => {
  const { isReady, config } = useSelector((state: RootState) => state.app);

  if (!isReady) {
    return (
      <Loader />
    );
  }

  return (
    <div styleName="container">
      <h1>Hello World</h1>
      <div styleName="config">
        <h2>app config:</h2>
        <div styleName="config-content">
          <p>env: {config.env}</p>
          <p>version: {config.version}</p>
          <p>assetsPath: {config.assetsPath}</p>
          <p>
            flags:
            <ul>
              {config.flags.length
                ? config.flags.map((flag: string) => <li>{flag}</li>)
                : <li>no flags set</li>}
            </ul>
          </p>
          <p>
            manifest:
            <ul>
              {Object.keys(config.manifest).map((key: string) => (
                <li>{`${key}: "${config.manifest[key]}"`}</li>
              ))}
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
