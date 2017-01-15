import {multiSelectDriverFactory} from './MultiSelect';

const multiSelectTestkitFactory = ({wrapper, id}) => {
  const component = wrapper.find(`#${id}`);
  return multiSelectDriverFactory({component: component.node, wrapper});
};

export {multiSelectTestkitFactory};
