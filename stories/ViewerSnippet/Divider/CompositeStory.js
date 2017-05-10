import React from 'react';
import {storiesOf} from '@kadira/storybook';
import InteractiveCodeExample from '../../utils/Components/InteractiveCodeExample';
import DividerSnippet from './DividerSnippet';

storiesOf('10. Divider', module)
  .add('Standard', () => (
    <div>
      <h1>Divider</h1>
      <InteractiveCodeExample title="Customize <Divider/>">
        <DividerSnippet/>
      </InteractiveCodeExample>
    </div>
  ));
