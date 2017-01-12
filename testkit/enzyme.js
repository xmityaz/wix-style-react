import {enzymetestkitFactoryCreator} from '../src/test-common';

import inputDriver from '../src/Input/Input.driver';
export const inputTestkitFactory = enzymetestkitFactoryCreator(inputDriver);

export {buttonTestkitFactory} from '../src/Button/testkit/Button.enzyme';
export {toastTestkitFactory} from '../src/Toast/testkit/Toast.enzyme';
export {dropdownTestkitFactory} from '../src/Dropdown/testKit/Dropdown.enzyme';
