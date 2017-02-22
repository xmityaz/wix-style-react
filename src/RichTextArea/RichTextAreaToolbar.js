import React, {PropTypes} from 'react';
import WixComponent from '../WixComponent';

class RichTextAreaToolbar extends WixComponent {
  updateEditorState(editorState) {
    this.setState({editorState}, () => {
      this.props.onChange(editorState);
    });
  }

  render() {
    const {onClick} = this.props;
    return (
      <div>
        <button data-hook="rich-text-area-button-bold" onMouseDown={event => {event.preventDefault(); onClick('bold')}}>B</button>
        <button data-hook="rich-text-area-button-italic" onClick={onClick}/>
        <button data-hook="rich-text-area-button-underlined" onClick={onClick}/>
      </div>
    );
  }
}

RichTextAreaToolbar.propTypes = {
  onClick: PropTypes.func,
};

export default RichTextAreaToolbar;
