import {labelTestkitFactory} from '../../testkit/protractor';
import eyes from 'eyes.it';

describe('Label', () => {
  eyes.it('should focus on the input when clicked', () => {
    const dataHook = 'label';
    const driver = labelTestkitFactory({dataHook});

    browser.get('iframe.html?selectedKind=Core&selectedStory=Label');

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(driver.element(), 15000))
      .then(() => {
        driver.click();
        expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(driver.getAssociatedInput().then(input => input.getAttribute('id')));
      });
  });
});
