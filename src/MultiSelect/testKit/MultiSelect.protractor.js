import _ from 'lodash/fp';

const multiSelectDriverFactory = ({component}) => ({
  element: () => component
});

const componentFactory = ({id}) => $(`#${id}`);

const protractorMultiSelectTestkitFactory = _.compose(multiSelectDriverFactory, componentFactory);

export {protractorMultiSelectTestkitFactory};
