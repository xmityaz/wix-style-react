import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

const buttonLayoutDriverFactory = ({element, wrapper, component}) => {
  const isClassExists = (element, className) => element.className.indexOf(className) !== -1;
  const getAttribute = (element, attribute) => element.getAttribute(attribute);

  return {
    exists: () => !!element,
    doesComponentHasClass: className => isClassExists(element, className),
    getComponentAttribute: attribute => getAttribute(element, attribute),
    getStyle: () => element.style._values,
    getElement: () => element.style,
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default buttonLayoutDriverFactory;