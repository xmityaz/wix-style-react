import React, {PropTypes} from 'react';
import {Editor} from 'slate';
import WixComponent from '../WixComponent';
import htmlSerializer from './htmlSerializer';

class RichTextArea extends WixComponent {
  schema = {
    nodes: {
      'unordered-list': props => <ul {...props.attributes}>{props.children}</ul>,
      'list-item': props => <li {...props.attributes}>{props.children}</li>,
      'ordered-list': props => <ol {...props.attributes}>{props.children}</ol>,
    },
    marks: {
      bold: {
        fontWeight: 'bold'
      },
      italic: {
        fontStyle: 'italic'
      },
      underlined: {
        textDecoration: 'underline'
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      editorState: htmlSerializer.deserialize(props.value),
    };
  }

  setEditorState = editorState => {
    this.setState({editorState}, this.triggerChange)
  };

  triggerChange() {
    const {onChange} = this.props;
    onChange && onChange(htmlSerializer.serialize(this.state.editorState));
  }

  render = () => {
    return (
      <div>
        <Editor
          schema={this.schema}
          state={this.state.editorState}
          onChange={this.setEditorState}
          />
      </div>
    );
  };
}

RichTextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

RichTextArea.defaultProps = {
  value: '<p></p>',
};

export default RichTextArea;
