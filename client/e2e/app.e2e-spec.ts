import { CarSystemPage } from './app.po';

describe('car-system App', () => {
  let page: CarSystemPage;

  beforeEach(() => {
    page = new CarSystemPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
