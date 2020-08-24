import React from 'react';
import classNames from 'classnames';
import { clamp } from 'lodash';

import styles from './__styles__/Loader.scss';

interface Props {
  colors?: string[];
  inline?: boolean;
  size?: number;
  className?: string;
}

const Loader: React.FunctionComponent<Props> = ({
  colors = ['#4B0082', '#800080', '#EE82EE'],
  inline = false,
  size = 128,
  className = undefined,
}: Props) => {
  const containerClasses = classNames(
    styles.container,
    { [styles.inline]: inline },
    className,
  );

  // multiplier ensures stroke of 3 when size is 128px
  // TODO: switch to animated SVG
  const stroke = clamp(size * 0.0234375, 0.5, 4);
  const color1 = colors[0] || '#ffffff';
  const color2 = colors.length > 1 ? colors[1] : color1;
  const color3 = colors.length > 2 ? colors[2] : color2;

  return (
    <div
      className={containerClasses}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div className={styles.inner}>
        <div
          style={{
            borderColor: color1,
            borderWidth: stroke,
          }}
        />
        <div
          style={{
            borderColor: color2,
            borderWidth: stroke,
          }}
        />
        <div
          style={{
            borderColor: color3,
            borderWidth: stroke,
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
