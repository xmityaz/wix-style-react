import React from 'react';
import ReactDOM from 'react-dom';

export default function addDataHook(Component) {

  return class DataHook extends React.Component {
    componentDidMount() {
      const {dataHook} = this.props;
      if (dataHook) {
        ReactDOM.findDOMNode(this).setAttribute('data-hook', dataHook);
      }
    }

    render() {
      return <Component {...this.props}/>
    }

    static protoTypes ={
      dataHook: React.PropTypes.string
    };
  };
}