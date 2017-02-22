import React, {PropTypes} from 'react';
import {Editor} from 'slate';
import WixComponent from '../WixComponent';
import htmlSerializer from './htmlSerializer';

class RichTextArea extends WixComponent {
  schema = {
    nodes: {
      'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
      'list-item': props => <li {...props.attributes}>{props.children}</li>,
      'numbered-list': props => <ol {...props.attributes}>{props.children}</ol>,
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

  onChange = state => {
    const {onChange} = this.props;
    this.setState({editorState: state});
    onChange && onChange(htmlSerializer.serialize(state));
  };

  render = () => {
    return (
      <div>
        <Editor
          schema={this.schema}
          state={this.state.editorState}
          onChange={this.onChange}
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
