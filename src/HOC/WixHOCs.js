import DataHookHOC from './DataHook';
import WixRef from './WixRef';

const MANDATORY_HOCS = [WixRef, DataHookHOC];

export default function(Component, optionalHOCs = []) {

  let component = Component;
  const hocs = MANDATORY_HOCS.concat(optionalHOCs);
  hocs.forEach(HOC => {
    const oldComponent = component;
    component = HOC(component);
    component.propTypes = Object.assign({}, oldComponent.propTypes, component.propTypes);
    component.defaultProps = Object.assign({}, oldComponent.defaultProps, component.defaultProps);
  });

  component.displayName = Component.displayName || Component.name;
  return component;
}