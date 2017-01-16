import _ from 'lodash/fp';
// import React from 'react';
// import {componentFactory, multiSelectDriverFactory} from './testKit/multiSelect';
import {multiSelectDriverFactory} from './testKit/multiSelect';
import {runInputWithOptionsTest} from '../InputWithOptions/inputWithOptions.spec';

runInputWithOptionsTest(multiSelectDriverFactory);

describe('multiSelect', () => {

  // const createDriver = _.compose(multiSelectDriverFactory, componentFactory);

  it('should do stuff', () => {

  });
});
