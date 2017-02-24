import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Tooltip from '../Tooltip';
import {Link} from '../Icons';
import styles from './RichTextAreaButton.scss';

const buttons = {
  link: {
    icon: Link,
    tooltipText: 'Link',
    iconWidth: 15,
    iconHeight: 16,
  },
};

class RichTextAreaButtonLink extends Component {
  state = {};
  hideForm = () => {
    this.setState({showForm: false});
  };

  getTooltipContent = () => {
    if (!this.state.showForm) {
      return 'LINK';
    }
    return (
      <form><input type="text" value="ADSG"/></form>
    );
  };

  handleMouseDown = event => {
    event.preventDefault();
    //this.props.onClick();
    const showForm = !this.state.showForm;
    this.setState({showForm});
  };

  render() {
    const {type, isActive} = this.props;

    const className = classNames(styles.button, {
      [styles.isActive]: isActive,
    });

    return (
      <Tooltip
        content={this.getTooltipContent()}
        overlay=""
        theme="dark"
        alignment="center"
        moveBy={{x: 2, y: 2}}
        onActiveChange={this.hideForm}
        onClickOutside={this.hideForm}
        >
        <button
          className={className}
          onMouseDown={this.handleMouseDown}
          data-hook={`rich-text-area-button-${type}`}
          >
          <span className={styles.wrapper}>
            {this.renderIcon()}
          </span>
        </button>
      </Tooltip>
    );
  }

  renderIcon() {
    const {icon: Icon, iconWidth, iconHeight} = buttons[this.props.type];
    return <Icon width={`${iconWidth}px`} height={`${iconHeight}px`}/>;
  }
}

RichTextAreaButtonLink.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default RichTextAreaButtonLink;
