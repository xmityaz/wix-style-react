import React from 'react';
import inputDriverFactory from './Input.driver';
import Input from '.';
import sinon from 'sinon';
import {createDriverFactory} from '../test-common';
import {inputTestkitFactory, tooltipTestkitFactory} from '../../testkit';
import {inputTestkitFactory as enzymeInputTestkitFactory} from '../../testkit/enzyme';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';

describe('Input', () => {
  const createDriver = createDriverFactory(inputDriverFactory);

  describe('test tooltip', () => {
    const resolveIn = timeout =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve({});
        }, timeout);
      });

    it('should dispaly the error tooltip on hover', () => {
      const driver = createDriver(<Input error errorMessage="I'm the error message"/>);
      const dataHook = driver.getTooltipDataHook();
      const wrapper = driver.getTooltipElement();
      const tooltipDriver = tooltipTestkitFactory({wrapper, dataHook});
      tooltipDriver.mouseEnter();

      return resolveIn(500).then(() => {
        expect(tooltipDriver.getContent()).toBe('I\'m the error message');
      });
    });

    describe('tooltipPlacement attribute', () => {
      ['top', 'bottom', 'left', 'right'].forEach(placement => {
        it(`should have a tooltip positioned to the ${placement}`, () => {
          const driver = createDriver(<Input error errorMessage="I'm the error message" theme="amaterial" tooltipPlacement={placement}/>);
          const dataHook = driver.getTooltipDataHook();
          const wrapper = driver.getTooltipElement();
          const tooltipDriver = tooltipTestkitFactory({wrapper, dataHook});
          tooltipDriver.mouseEnter();

          return resolveIn(500).then(() => {
            expect(tooltipDriver.getPlacement()).toBe(placement);
          });
        });
      });
    });

    describe('onTooltipShow attribute (only for amaterial theme for now)', () => {
      it('should be called when error tooltip is active', () => {
        const onTooltipShow = sinon.spy();

        const driver = createDriver(<Input theme="amaterial" error errorMessage="I'm the error message" onTooltipShow={onTooltipShow}/>);
        const dataHook = driver.getTooltipDataHook();
        const wrapper = driver.getTooltipElement();
        const tooltipDriver = tooltipTestkitFactory({wrapper, dataHook});
        tooltipDriver.mouseEnter();

        return resolveIn(500).then(() => {
          expect(onTooltipShow.calledOnce).toBeTruthy();
        });
      });

      it('should be called when help tooltip is active (only for amaterial theme for now)', () => {
        const onTooltipShow = sinon.spy();

        const driver = createDriver(<Input theme="amaterial" help helpMessage="I'm the help message" onTooltipShow={onTooltipShow}/>);
        const dataHook = driver.getTooltipDataHook();
        const wrapper = driver.getTooltipElement();
        const tooltipDriver = tooltipTestkitFactory({wrapper, dataHook});
        tooltipDriver.mouseEnter();

        return resolveIn(500).then(() => {
          expect(onTooltipShow.calledOnce).toBeTruthy();
        });
      });
    });
  });

  describe('value attribute', () => {
    it('should pass down to the wrapped input', () => {
      const props = {
        value: 'hello',
        onChange: () => {}
      };

      const driver = createDriver(<Input {...props}/>);
      expect(driver.getValue()).toEqual(props.value);
    });
  });

  describe('defaultValue attribute', () => {
    it('should pass down to the wrapped input', () => {
      const defaultValue = 'hello';

      const driver = createDriver(<Input defaultValue={defaultValue}/>);
      expect(driver.getDefaultValue()).toEqual(defaultValue);
    });
  });

  describe('tabIndex attribute', () => {
    it('should pass down to the wrapped input', () => {
      const tabIndex = 1;

      const driver = createDriver(<Input tabIndex={tabIndex}/>);
      expect(driver.getTabIndex()).toEqual(tabIndex);
    });
  });

  describe('readOnly attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<Input readOnly/>);
      expect(driver.getReadOnly()).toBeTruthy();
    });

    it('should pass down to the wrapped input with default false value', () => {
      const driver = createDriver(<Input/>);
      expect(driver.getReadOnly()).toBeFalsy();
    });
  });

  describe('textOverflow attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<Input textOverflow="ellipsis"/>);
      expect(driver.getTextOverflow()).toBe('ellipsis');
    });

    it('should pass down to the wrapped input with default clip value', () => {
      const driver = createDriver(<Input/>);
      expect(driver.getTextOverflow()).toBe('clip');
    });
  });

  describe('type attribute', () => {
    it('should set the type attribute', () => {
      const driver = createDriver(<Input type="number"/>);
      expect(driver.getType()).toBe('number');
    });
  });

  describe('error attribute', () => {
    it('should display an error icon if error is true', () => {
      const driver = createDriver(<Input error/>);

      expect(driver.hasExclamation()).toBeTruthy();
      expect(driver.hasError()).toBeTruthy();
    });
  });

  describe('help attribute', () => {
    it('should display an help icon if help is true', () => {
      const driver = createDriver(<Input help/>);

      expect(driver.hasHelp()).toBeTruthy();
    });
  });

  describe('unit attribute', () => {
    it('should the unit text if passed', () => {
      const unit = '$';

      const driver = createDriver(<Input unit={unit}/>);
      expect(driver.getUnit()).toEqual(unit);
    });
  });

  describe('magnifyingGlass attribute', () => {
    it('should display a magnifying glass icon if magnifyingGlass is true', () => {
      const driver = createDriver(<Input magnifyingGlass/>);
      expect(driver.hasMagnifyingGlass()).toBeTruthy();
    });

    it('should not display a magnifying glass icon if magnifyingGlass is false', () => {
      const driver = createDriver(<Input magnifyingGlass={false}/>);
      expect(driver.hasMagnifyingGlass()).toBeFalsy();
    });

    it('should not display a magnifying glass icon if error is true', () => {
      const driver = createDriver(<Input magnifyingGlass error/>);
      expect(driver.hasMagnifyingGlass()).toBeFalsy();
    });
  });

  describe('menuArrow attribute', () => {
    it('should display a menu arrow icon if menuArrow is true', () => {
      const driver = createDriver(<Input menuArrow/>);
      expect(driver.hasMenuArrow()).toBeTruthy();
    });

    it('should not display a menu arrow icon if menuArrow is false', () => {
      const driver = createDriver(<Input menuArrow={false}/>);
      expect(driver.hasMenuArrow()).toBeFalsy();
    });

    it('should not display a menu arrow icon if error is true', () => {
      const driver = createDriver(<Input menuArrow error/>);
      expect(driver.hasMenuArrow()).toBeFalsy();
    });

    it('should not display a menu arrow icon if magnifyingGlass is true', () => {
      const driver = createDriver(<Input menuArrow magnifyingGlass/>);
      expect(driver.hasMenuArrow()).toBeFalsy();
    });
  });

  describe('rtl attribute', () => {
    it('should have rtl if rtl prop is true', () => {
      const driver = createDriver(<Input rtl/>);
      expect(driver.isRTL()).toBeTruthy();
    });

    it('should not have rtl if rtl prop is false', () => {
      const driver = createDriver(<Input rtl={false}/>);
      expect(driver.isRTL()).toBeFalsy();
    });
  });

  describe('onChange attribute', () => {
    it('should be called when text is entered to the input', () => {

      const onChange = jest.fn();
      const event = {target: {value: 'world'}};

      const driver = createDriver(<Input onChange={onChange}/>);

      driver.trigger('change', event);

      expect(onChange).toBeCalled();
    });
  });

  describe('onKeyUp attribute', () => {
    it('should be called after keybord key got pressed and then released', () => {
      const onKeyUp = jest.fn();
      const event = {target: {value: 'world'}};

      const driver = createDriver(<Input onKeyUp={onKeyUp}/>);

      driver.trigger('keyUp', event);

      expect(onKeyUp).toBeCalled();
    });
  });

  describe('onFocus attribute', () => {
    it('should be called when the input gets focused', () => {
      const onFocus = jest.fn();
      const driver = createDriver(<Input onFocus={onFocus}/>);

      driver.trigger('focus');

      expect(onFocus).toBeCalled();
    });
  });

  describe('onBlur attribute', () => {
    it('should be called when the input gets blured', () => {
      const onBlur = jest.fn();
      const driver = createDriver(<Input onBlur={onBlur}/>);

      driver.trigger('blur');

      expect(onBlur).toBeCalled();
    });
  });

  describe('onKeyDown attribute', () => {
    it('should be called when text is entered to the wrapped input', () => {
      const onKeyDown = jest.fn();
      const event = {keyCode: 40};

      const driver = createDriver(<Input onKeyDown={onKeyDown}/>);

      driver.trigger('keyDown', event);

      expect(onKeyDown).toBeCalled();
    });
  });

  describe('forceFocus attribute', () => {
    it('should have focus class on input if forceFocus is true', () => {
      const driver = createDriver(<Input forceFocus/>);
      expect(driver.isFocusedStyle()).toBeTruthy();
    });
  });

  describe('forceHover attribute', () => {
    it('should have hover class on input if forceHover is true', () => {
      const driver = createDriver(<Input forceHover/>);
      expect(driver.isHoveredStyle()).toBeTruthy();
    });

    it('should be hovered if forceFocus is false and forceHover is true', () => {
      const driver = createDriver(<Input forceHover forceFocus={false}/>);
      expect(driver.isHoveredStyle()).toBeTruthy();
    });
  });

  describe('disable attribute', () => {
    it('should have disabled class on input if disabled is true', () => {
      const driver = createDriver(<Input disabled/>);
      expect(driver.isDisabled()).toBeTruthy();
    });
  });

  describe('autoFocus attribute', () => {
    it('Mounting an input element with autoFocus=false, should give it the focus', () => {
      let autoFocus = false;
      const driver = createDriver(<Input autoFocus={false}/>);
      expect(driver.isFocus()).toBeFalsy();
      autoFocus = true;
      driver.setProps({autoFocus});
      expect(driver.isFocus()).toBeFalsy();
    });

    it('Mounting an input element with autoFocus=true, gives it the focus', () => {
      const driver = createDriver(<Input autoFocus/>);
      expect(driver.isFocus()).toBeTruthy();
    });
  });

  describe('focus function', () => {
    it('calling focus should give focus to the input', () => {
      const driver = createDriver(<Input autoFocus={false}/>);
      expect(driver.isFocus()).toBeFalsy();
      driver.focus();
      expect(driver.isFocus()).toBeTruthy();
    });
  });

  describe('theme attribute', () => {
    it('should set the theme by default to "normal"', () => {
      const driver = createDriver(<Input/>);
      expect(driver.isOfStyle('normal')).toBeTruthy();
    });

    it('should allowing setting the theme to "paneltitle"', () => {
      const driver = createDriver(<Input theme="paneltitle"/>);
      expect(driver.isOfStyle('paneltitle')).toBeTruthy();
    });

    it('should allow setting the theme to "material"', () => {
      const driver = createDriver(<Input theme="material"/>);
      expect(driver.isOfStyle('material')).toBeTruthy();
    });

    it('should allow setting the theme to "flat"', () => {
      const driver = createDriver(<Input theme="flat"/>);
      expect(driver.isOfStyle('flat')).toBeTruthy();
    });

    it('should allow setting the theme to "flatdark"', () => {
      const driver = createDriver(<Input theme="flatdark"/>);
      expect(driver.isOfStyle('flatdark')).toBeTruthy();
    });
  });

  describe('onClear attribute', () => {
    it('should not be displayed when text is empty', () => {
      const onClear = () => {};
      const onChange = () => {};
      const driver = createDriver(<Input onClear={onClear} value="" onChange={onChange}/>);
      expect(driver.hasClearButton()).toBeFalsy();
    });

    it('should display a X when text is not null, and be clickable', () => {
      const onClear = sinon.spy();
      const onChange = () => {};
      const driver = createDriver(<Input onClear={onClear} value={'some value'} onChange={onChange}/>);
      expect(driver.hasClearButton()).toBeTruthy();
      driver.clickClear();
      expect(onClear.calledOnce).toBeTruthy();
    });

    it('should display a left icon when one is passed', () => {
      const driver = createDriver(<Input iconLeft={<div/>}/>);
      expect(driver.hasIconLeft()).toBeTruthy();
    });
  });

  describe('size attribute', () => {
    it('should use "normal" size by default', () => {
      const driver = createDriver(<Input/>);
      expect(driver.isOfSize('normal')).toBeTruthy();
    });

    it('should use "small" size', () => {
      const driver = createDriver(<Input size="small"/>);
      expect(driver.isOfSize('small')).toBeTruthy();
    });

    it('should use "large" size', () => {
      const driver = createDriver(<Input size="large"/>);
      expect(driver.isOfSize('large')).toBeTruthy();
    });

  });

  describe('prefix attribute', () => {
    it('should allow adding a custom prefix component', () => {
      const driver = createDriver(<Input prefix={<div className="my-button"/>}/>);
      expect(driver.hasPrefix()).toBeTruthy();
      expect(driver.prefixComponentExists('.my-button')).toBeTruthy();
    });

    it('should add `withPrefix` classname to input', () => {
      const driver = createDriver(<Input prefix="hello"/>);
      expect(driver.hasPrefixClass()).toBeTruthy();
    });
  });

  describe('suffix attribute', () => {
    it('should allow adding a custom suffix component', () => {
      const driver = createDriver(<Input suffix={<div className="my-button"/>}/>);
      expect(driver.hasSuffix()).toBeTruthy();
      expect(driver.suffixComponentExists('.my-button')).toBeTruthy();
    });

    it('should add `withSuffix` classname to input', () => {
      const driver = createDriver(<Input suffix="hello"/>);
      expect(driver.hasSuffixClass()).toBeTruthy();
    });

    it('should add `withSuffixes` classname to input when more than 1 suffix applied', () => {
      const driver = createDriver(<Input suffix="hello" magnifyingGlass/>);
      expect(driver.hasSuffixesClass()).toBeTruthy();
    });
  });

  describe('aria attributes', () => {
    it('should allow adding a custom aria-label', () => {
      const driver = createDriver(<Input ariaLabel="hello"/>);
      expect(driver.getAriaLabel()).toBe('hello');
    });

    it('should not have any aria label buy default', () => {
      const driver = createDriver(<Input/>);
      expect(driver.getAriaLabel()).toBeNull;
    });

    it('should allow adding aria-controls', () => {
      const driver = createDriver(<Input ariaControls="id"/>);
      expect(driver.getAriaControls()).toBe('id');
    });

    it('should not have any aria controls buy default', () => {
      const driver = createDriver(<Input/>);
      expect(driver.getAriaControls()).toBeNull;
    });

    it('should allow adding aria-controls', () => {
      const driver = createDriver(<Input ariaDescribedby="blabla"/>);
      expect(driver.getAriaDescribedby()).toBe('blabla');
    });

    it('should not have any aria controls buy default', () => {
      const driver = createDriver(<Input/>);
      expect(driver.getAriaDescribedby()).toBeNull;
    });

  });

});

describe('testkit', () => {
  it('should exist', () => {
    const value = 'hello';
    const onChange = () => {};
    expect(isTestkitExists(<Input value={value} onChange={onChange}/>, inputTestkitFactory)).toBe(true);
  });
});

describe('enzyme testkit', () => {
  it('should exist', () => {
    const value = 'hello';
    const onChange = () => {};
    expect(isEnzymeTestkitExists(<Input value={value} onChange={onChange}/>, enzymeInputTestkitFactory)).toBe(true);
  });
});
