import React from 'react';
import qs from 'qs';
import { shallow } from 'enzyme';

import { AppState } from '../../store/app/types';

import { useActiveFlags } from '../featureFlags';

let mockLocation = '/path';
let localConfig = {};
let paramsObj: { [key: string]: string|number|boolean|undefined } = {};
const mockAppConfig = {
  env: 'test',
  version: '0',
  assetsPath: '',
  manifest: {},
  flags: [],
};
const setUrlFlags = (enabled: boolean, ...flags: string[]): void => {
  const key = enabled ? 'ffe' : 'ffd';
  paramsObj[key] = flags.join(',');
};
const mockLocationReturn = (): { [key: string]: string } => ({
  pathname: mockLocation,
  search: qs.stringify(paramsObj, {
    addQueryPrefix: true,
    format: 'RFC1738',
  }),
});
const mockAppState = (): AppState => ({
  isReady: true,
  config: {
    ...mockAppConfig,
    ...localConfig,
  },
});

jest.mock('react-redux', () => ({
  // @ts-ignore
  ...jest.requireActual('react-redux'),
  useSelector: () => mockAppState(),
}));

jest.mock('react-router-dom', () => ({
  // @ts-ignore
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocationReturn(),
}));

describe('hooks/featureFlags', () => {
  interface HookWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    hook: () => string[];
  }
  // @ts-ignore
  const HookWrapper = ({ hook }: HookWrapperProps) => <div hook={hook()} />;
  const cleanUp = () => {
    localConfig = {};
    mockLocation = '/path';
    paramsObj = {
      adummy: true,
      zdummmy: false,
    };
  };

  beforeEach(cleanUp);
  afterEach(cleanUp);

  describe('useActiveFlags', () => {
    const mockInitialFlags = [
      'initial1',
      'initial.2',
      'initial-3',
      'initial_4',
      'initial 5',
    ];
    const mockUrlEnabledFlags = [
      'url1',
      'url.2',
      'url-3',
      'url_4',
      'url 5',
    ];
    const mockSharedFlags = [
      'shared1',
      'shared.2',
      'shared-3',
      'shared_4',
      'shared 5',
    ];

    it('returns empty flags', () => {
      const wrapper = shallow(
        <HookWrapper hook={() => useActiveFlags()} />
      );

      expect(wrapper.props().hook).toMatchSnapshot();
    });

    it('returns only initial flags', () => {
      localConfig = { flags: mockInitialFlags };

      const wrapper = shallow(
        <HookWrapper hook={() => useActiveFlags()} />
      );

      expect(wrapper.props().hook).toMatchSnapshot();
    });

    it('returns only url enabled flags', () => {
      setUrlFlags(
        true,
        ...mockUrlEnabledFlags
      );

      const wrapper = shallow(
        <HookWrapper hook={() => useActiveFlags()} />
      );

      expect(wrapper.props().hook).toMatchSnapshot();
    });

    it('returns unique initial and url enabled flags', () => {
      localConfig = {
        flags: mockInitialFlags.concat(mockSharedFlags),
      };
      setUrlFlags(
        true,
        ...mockUrlEnabledFlags.concat(mockSharedFlags),
      );

      const wrapper = shallow(
        <HookWrapper hook={() => useActiveFlags()} />
      );

      expect(wrapper.props().hook).toMatchSnapshot();
    });

    it('returns without url disabled flags', () => {
      const disabledFlags = [
        'initial1',
        'shared.2',
        'url-3',
        'initial_4',
        'shared 5',
      ];

      localConfig = {
        flags: mockInitialFlags.concat(mockSharedFlags),
      };
      setUrlFlags(
        true,
        ...mockUrlEnabledFlags.concat(mockSharedFlags),
      );
      setUrlFlags(
        false,
        ...disabledFlags,
      );

      const wrapper = shallow(
        <HookWrapper hook={() => useActiveFlags()} />
      );

      expect(wrapper.props().hook).toEqual(
        expect.not.arrayContaining(disabledFlags)
      );
      expect(wrapper.props().hook).toMatchSnapshot();
    });

    it('returns empty if all flags disabled', () => {
      localConfig = {
        flags: mockInitialFlags.concat(mockSharedFlags),
      };
      setUrlFlags(
        true,
        ...mockUrlEnabledFlags.concat(mockSharedFlags),
      );
      setUrlFlags(
        false,
        ...mockInitialFlags,
        ...mockSharedFlags,
        ...mockUrlEnabledFlags,
      );

      const wrapper = shallow(
        <HookWrapper hook={() => useActiveFlags()} />
      );

      expect(wrapper.props().hook.length).toEqual(0);
      expect(wrapper.props().hook).toMatchSnapshot();
    });

    it('returns empty safely if only flags disabled', () => {
      setUrlFlags(
        false,
        ...mockInitialFlags,
        ...mockSharedFlags,
        ...mockUrlEnabledFlags,
      );

      const wrapper = shallow(
        <HookWrapper hook={() => useActiveFlags()} />
      );

      expect(wrapper.props().hook.length).toEqual(0);
      expect(wrapper.props().hook).toMatchSnapshot();
    });
  });
});
