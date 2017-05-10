import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Markdown from '../../utils/Components/Markdown';
import CodeExample from '../../utils/Components/CodeExample';
import Readme from 'wix-style-react/Viewer/Divider/README.md';
import ReadmeTestkit from '../../../src/Viewer/Divider/README.TESTKIT.md';
import TabbedView from '../../utils/Components/TabbedView';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw!./ExampleStandard';

storiesOf('Viewer', module)
  .add('Divider', () => (
  <TabbedView tabs={['API', 'Testkit']}>
    <div>
      <Markdown source={Readme}/>
      {ExampleStandard}
    </div>
    <div>
      <Markdown source={ReadmeTestkit}/>
    </div>
  </TabbedView>
  ));
