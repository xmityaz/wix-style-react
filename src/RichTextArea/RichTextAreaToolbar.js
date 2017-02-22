import React, {PropTypes} from 'react';
import WixComponent from '../WixComponent';

class RichTextAreaToolbar extends WixComponent {
  updateEditorState(editorState) {
    this.setState({editorState}, () => {
      this.props.onChange(editorState);
    });
  }

  render() {
    return (
      <div>
        <button data-hook="rich-text-area-button-bold"/>
        <button data-hook="rich-text-area-button-italic"/>
        <button data-hook="rich-text-area-button-underlined"/>
      </div>
    );
  }
}

RichTextAreaToolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
};

export default RichTextAreaToolbar;
