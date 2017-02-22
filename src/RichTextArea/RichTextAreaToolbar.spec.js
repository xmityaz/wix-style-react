import React from 'react';
import {Raw} from 'slate';
import {createDriverFactory} from '../test-common';
import richTextAreaToolbarDriverFactory from './RichTextAreaToolbar.driver';
import RichTextAreaToolbar from './RichTextAreaToolbar';

describe('RichTextAreaToolbar', () => {
  let currentValue;

  it('should exist', () => {
    const driver = createComponent();
    expect(driver.exists()).toBeTruthy();
  });

  it('should render buttons specified in props.buttons', () => {
    const buttons = [
      'bold',
      'italic',
      'underlined',
    ];
    const driver = createComponent({ buttons });
    expect(driver.getButtonTypes()).toEqual(buttons);
  });

  it('should handle bold button click', () => {
    const value = createEditorStateFromText('Bacon ipsum dolor amet ball tip hamburger');
    const driver = createComponent({ value, buttons: ['bold'] });
    driver.clickBoldButton();

    expect(currentValue).toEqual();
  });

  const createDriver = createDriverFactory(richTextAreaToolbarDriverFactory);
  function createComponent(props) {
    const onChange = newValue => currentValue = newValue;
    return createDriver(<RichTextAreaToolbar onChange={onChange} {...props}/>);
  }

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
});
