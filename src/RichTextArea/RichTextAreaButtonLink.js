import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import RichTextAreaButton from './RichTextAreaButton';
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
  state = {
    isFormVisible: false,
  };

  toggleForm = () => {
    this.state.isFormVisible ?
      this.hideForm() :
      this.showForm();
  };

  showForm = () => {
    this.setState({isFormVisible: true});
  };

  hideForm = () => {
    this.setState({isFormVisible: false});
  };

  getTooltipContent = () => {
    return (
      <div><input type="text" value="ADSG"/></div>
    );
  };

  render() {
    const {isFormVisible} = this.state;
    return (
      <Tooltip
        content={this.getTooltipContent()}
        overlay=""
        alignment="center"
        placement="bottom"
        showTrigger="custom"
        hideTrigger="custom"
        moveBy={{x: 2, y: 0}}
        active={isFormVisible}
        onClickOutside={this.hideForm}
        >
        <RichTextAreaButton onClick={this.toggleForm} type="link" isTooltipDisabled={isFormVisible}/>
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
