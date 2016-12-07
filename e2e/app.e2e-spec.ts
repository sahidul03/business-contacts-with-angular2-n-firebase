import { BusinessContactsWithAngular2NFirebasePage } from './app.po';

describe('business-contacts-with-angular2-n-firebase App', function() {
  let page: BusinessContactsWithAngular2NFirebasePage;

  beforeEach(() => {
    page = new BusinessContactsWithAngular2NFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
