import React from 'react';
import {render} from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import RichTextAreaToolbar from './RichTextAreaToolbar';

const richTextAreaDriverFactory = ({component, wrapper}) => {
  const getButtons = () => [...component.querySelectorAll('[data-hook*="rich-text-area-button"]')];
  const getButtonType = button => button.getAttribute('data-hook').replace(/^rich-text-area-button-/, '');
  const getButtonByType = type => getButtons().find(button => getButtonType(button) === type);
  const clickButtonByType = type => () => ReactTestUtils.Simulate.click(getButtonByType(type));

  return {
    exists: () => !!component,
    getButtonTypes: () => getButtons()
      .map(getButtonType),
    clickBoldButton: clickButtonByType('bold'),
    setProps: props => render(
      <div ref={r => component = r.childNodes[0]}><RichTextAreaToolbar {...props}/></div>,
      wrapper
    ),
  };
};

export default richTextAreaDriverFactory;
