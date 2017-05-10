import React, {PropTypes, Component} from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import {TextLink} from 'wix-style-react/Viewer';

export class Form extends Component {

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.getComponent()));
  }

  getComponent() {
    const link = 'http://www.wix.com';
    return (
      <TextLink
        link={link}
        children={this.props.children}
        rel={this.props.rel}
        target={this.props.target === 'framename' ? this.props.framename : this.props.target}
        download={this.props.download}
        underlineStyle={this.props.underlineStyle}
        darkBackground={this.props.darkBackground}
        size={this.props.size}
        disabled={this.props.disabled}
        ariaLabel={this.props.ariaLabel}
        color={this.props.color}
        hover={this.props.hover}
      >
        Wix Link
      </TextLink>
    );
  }

  render() {
    return this.getComponent();
  }
}

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  underlineStyle: PropTypes.string,
  darkBackground: PropTypes.bool,
  download: PropTypes.bool,
  rel: PropTypes.string,
  target: PropTypes.string,
  ariaLabel: PropTypes.string,
  color: PropTypes.string,
  hover: PropTypes.string
};

export default Form;

