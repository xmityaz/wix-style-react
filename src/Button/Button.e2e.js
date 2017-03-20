import eyes from 'eyes.it';
import {buttonTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';

describe('Button', () => {
  const storyUrl = getStoryUrl('Core', 'Button');
  const dataHook = 'story-button';

  eyes.it('should click a button', () => {
    const driver = buttonTestkitFactory({dataHook});

    browser.get(storyUrl);
  
    waitForVisibilityOf(driver.element(), 10000, 'Cant find Button')
      .then(() => {
        expect(driver.element().isDisplayed()).toBeTruthy();
        expect(driver.getButtonText()).toBe('Click Me!');
        driver.click();
        expect(driver.getButtonText()).toBe('Clicked!');
      });
  });
});
