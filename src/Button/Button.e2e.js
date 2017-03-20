import eyes from 'eyes.it';
import {buttonTestkitFactory} from '../../testkit/protractor';

describe('Button', () => {
  eyes.it('should click a button', () => {
    const dataHook = 'example-btn';
    const driver = buttonTestkitFactory({dataHook});

    browser.get('iframe.html?selectedKind=Core&selectedStory=Button');

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(driver.element(), 15000))
      .then(() => {
        expect(driver.getButtonText()).toBe('Click Me!');
        driver.click();
        expect(driver.getButtonText()).toBe('Clicked!');
      });
  });
});
