import React from 'react';
import ReactDOM from 'react-dom';

const MOUSE_EVENTS_SUPPORTED = ['click'];

export default function addOnClickOutside(Component) {

  return class OnClickOutside extends React.Component {

    constructor(params) {
      super(params);
      this._onMouseEventsHandler = this._onMouseEventsHandler.bind(this);
    }

    _onMouseEventsHandler(e) {
      const domNode = ReactDOM.findDOMNode(this);
      const wrappedComponent = this._wrappedComponent;
      if (
        (!domNode || !domNode.contains(e.target)) &&
        typeof wrappedComponent.handleClickOutside === 'function'
      ) {
        wrappedComponent.handleClickOutside(e);
      }
    }

    componentDidMount() {
      MOUSE_EVENTS_SUPPORTED.forEach(eventName => {
        document.addEventListener(eventName, this._onMouseEventsHandler, true)
      });
    }

    componentWillUnmount() {
      MOUSE_EVENTS_SUPPORTED.forEach(eventName => {
        document.removeEventListener(eventName, this._onMouseEventsHandler, true)
      });
    }

    render() {
      return <Component
        {...this.props}
        ref={c => {this._wrappedComponent = c;}}
      />;
    }
  };
}