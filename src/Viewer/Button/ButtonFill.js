import React from 'react';
import {any, func, node, string} from 'prop-types';
import styles from './Button.scss';
import WixComponent from '../../BaseComponents/WixComponent';
import ButtonLayout from '../ButtonLayout/ButtonLayout';
import omit from 'lodash.omit';

class Button extends WixComponent {
  static propTypes = {
    ...ButtonLayout.propTypes,
    children: any,
    type: string,
    onClick: func
  };

  static defaultProps = ButtonLayout.defaultProps;

  constructor(props) {
    super(props);
  }

  render() {
    const {disabled, onClick, children, type} = this.props;
    const buttonLayoutProps = omit(this.props, ['id', 'onClick', 'prefixIcon', 'suffixIcon', 'type']);

    return (
      <ButtonLayout {...buttonLayoutProps}>
        <button onClick={onClick} disabled={disabled} type={type}>
          {children}
        </button>
      </ButtonLayout>
    );
  }
}

Button.displayName = 'Button';

export default Button;
