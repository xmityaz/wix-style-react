import React from 'react';
import {shallow} from 'enzyme';
import Checkbox from './Checkbox';
import styles from './Checkbox.scss';

const checkboxDriverFactory = component => {
  console.log("*********" + component);
  return {
    change: () => {
      component.find('input').simulate('change');
    },
      isChecked: () => component.find(`.${styles.wrapper}`).hasClass(styles.checked),
    isIndeterminate: () => component.find(`.${styles.indeterminate}`).length === 1
  }
};

const componentFactory = () => {
  const createShallow = (props = {}) => {
    return shallow(
      <Checkbox {...props}/>
    );
  };

  return {createShallow};
};

export {componentFactory, checkboxDriverFactory};
