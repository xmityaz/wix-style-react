import React from 'react';
import {shallow} from 'enzyme';
import Checkbox from './Checkbox';
import styles from './Checkbox.scss';

const driverFactory = component => ({
  change: () => {
    component.find('input').simulate('change');
  },
  isChecked: () => component.find(`.${styles.wrapper}`).hasClass(styles.checked)
});

const componentFactory = () => {
  const createShallow = (props = {}) => {
    return shallow(
      <Checkbox {...props}/>
    );
  };

  return {createShallow};
};

export {componentFactory, driverFactory};
