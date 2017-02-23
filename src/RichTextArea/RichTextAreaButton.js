import React, {Component, PropTypes} from 'react';
import Tooltip from '../Tooltip';
import {Bold, Italic, Underline, UnorderedList, OrderedList} from '../Icons';
import styles from './RichTextAreaButton.scss';

const buttons = {
  bold: {
    icon: Bold,
    tooltipText: 'Bold',
    iconWidth: 11,
    iconHeight: 14,
  },
  italic: {
    icon: Italic,
    tooltipText: 'Italic',
    iconWidth: 8,
    iconHeight: 14,
  },
  underline: {
    icon: Underline,
    tooltipText: 'Underline',
    iconWidth: 15,
    iconHeight: 15,
  },
  'unordered-list': {
    icon: UnorderedList,
    tooltipText: 'Bulletted list',
    iconWidth: 15,
    iconHeight: 15,
  },
  'ordered-list': {
    icon: OrderedList,
    tooltipText: 'Numbered list',
    iconWidth: 15,
    iconHeight: 16,
  },
};

class RichTextAreaButton extends Component {
  handleMouseDown = event => {
    event.preventDefault();
    this.props.onClick();
  };

  render() {
    const {type} = this.props;
    const tooltipContent = <p className={styles.tooltipContent}>{buttons[type].tooltipText}</p>;
    return (
      <Tooltip
        content={tooltipContent}
        overlay=""
        theme="dark"
        alignment="center"
        moveBy={{x: 2, y: 2}}
        >
        <button
          className={styles.button}
          onMouseDown={this.handleMouseDown}
          data-hook={`rich-text-area-button-${type}`}
          >
          {this.renderIcon()}
        </button>
      </Tooltip>
    );
  }

  renderIcon() {
    const {icon: Icon, iconWidth, iconHeight} = buttons[this.props.type];
    return <Icon width={`${iconWidth}px`} height={`${iconHeight}px`}/>;
  }
}

RichTextAreaButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RichTextAreaButton;
