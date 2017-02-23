import React, {PropTypes} from 'react';
import WixComponent from '../WixComponent';

class RichTextAreaToolbar extends WixComponent {
  getMouseDownHandler(action, type) {
    return event => {
      const {onClick} = this.props;
      event.preventDefault();
      onClick && onClick(action, type);
    };
  }

  render() {
    return (
      <div>
        <button data-hook="rich-text-area-button-bold" onMouseDown={this.getMouseDownHandler('mark', 'bold')}>B</button>
        <button data-hook="rich-text-area-button-italic" onMouseDown={this.getMouseDownHandler('mark', 'italic')}>I</button>
        <button data-hook="rich-text-area-button-underline" onMouseDown={this.getMouseDownHandler('mark', 'underline')}>U</button>
        <button data-hook="rich-text-area-button-unordered-list" onMouseDown={this.getMouseDownHandler('block', 'unordered-list')}>UL</button>
        <button data-hook="rich-text-area-button-ordered-list" onMouseDown={this.getMouseDownHandler('block', 'ordered-list')}>OL</button>
      </div>
    );
  }
}

RichTextAreaToolbar.propTypes = {
  onClick: PropTypes.func,
};

export default RichTextAreaToolbar;
