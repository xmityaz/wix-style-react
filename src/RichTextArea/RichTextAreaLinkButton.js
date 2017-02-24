import React, {Component, PropTypes} from 'react';
import Tooltip from '../Tooltip';
import RichTextAreaLinkForm from './RichTextAreaLinkForm';
import RichTextAreaButton from './RichTextAreaButton';

class RichTextAreaLinkButton extends Component {
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

  getTooltipContent = () => <RichTextAreaLinkForm onCancel={this.hideForm}/>;

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
}

RichTextAreaLinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default RichTextAreaLinkButton;
