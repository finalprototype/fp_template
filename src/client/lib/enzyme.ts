import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
});

export const shallow = Enzyme.shallow;
export const mount = Enzyme.mount;
export const render = Enzyme.render;

export default Enzyme;
