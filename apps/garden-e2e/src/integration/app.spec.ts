import { NavConstants } from '@halcyon/common';

describe('garden', () => {
  beforeEach(() => cy.visit('/'));

  it('should display nav', () => {
    cy.get('[data-testid="nav"]')
      .find('li')
      .should('contain.text', 'Home')
      .should('contain.text', 'Products')
      .should('contain.text', 'About')
      .should('contain.text', 'Contact');
  });

  it('should display nav using consts', () => {
    NavConstants.NAV_ITEMS.forEach((navItem) => {
      cy.get('[data-testid="nav"]')
        .find('li')
        .should('contain.text', navItem);
    });
  });
});
