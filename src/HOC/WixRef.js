import React from 'react';

export default function addDataHook(Component) {

  return class DataHook extends React.Component {
    componentDidMount() {
      if (this.props.wixRef && typeof this.props.wixRef !== "function") {
        alert(this.props.wixRef);
      }
      this.props.wixRef && this.props.wixRef(this._wrappedComponent);
    }

    render() {
      return <Component {...this.props} ref={c => {this._wrappedComponent = c;}}/>
    }

    static protoTypes ={
      wixRef: React.PropTypes.func
    };
  };
}