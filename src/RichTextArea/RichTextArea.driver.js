import React from 'react';
import {render} from 'react-dom';
// import ReactTestUtils from 'react-addons-test-utils';
import {Raw} from 'slate';
import RichTextArea from './RichTextArea';

const richTextAreaDriverFactory = ({component, componentInstance, wrapper}) => {
  return {
    exists: () => !!component,
    getContent: () => component.textContent,
    enterText: text => componentInstance.setEditorState(createEditorStateFromText(text)),
    setProps: props => render(
      <div ref={r => component = r.childNodes[0]}>
        <RichTextArea ref={r => componentInstance = r} {...props}/>
      </div>,
      wrapper
    ),
  };
};

function createEditorStateFromText(text) {
  return Raw.deserialize({
    nodes: [
      {
        kind: 'block',
        type: 'paragraph',
        nodes: [
          {
            kind: 'text',
            text
          }
        ]
      }
    ]
  }, { terse: true });
}

export default richTextAreaDriverFactory;
