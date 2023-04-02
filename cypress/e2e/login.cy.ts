import { loginCy } from '@/enums/dataCy';
import { getDataCy } from 'cypress/support/getDataCy';
import { customHttpErrors } from '@/enums/customHttpErrors';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('Should successfully login and go to dashboard page', () => {
    cy.get(getDataCy(loginCy.userNameInput)).type('tassioFront');
    cy.get(getDataCy(loginCy.userNameBtn)).click();
    cy.url().should('match', /app\/dashboard/);
  });

  it('Should show alert with not found message - 404 http error', () => {
    cy.get(getDataCy(loginCy.userNameInput)).type('sdasldkasdo22332rsdjfksdfd');
    cy.get(getDataCy(loginCy.userNameBtn)).click();
    cy.url().should('not.match', /app\/dashboard/);
    cy.on('alert', (t) => {
      //assertions
      expect(t).to.contains(
        'Sorry, something went wrong to get user github data'
      );
    });
  });

  it('Should show unexpected error message', () => {
    cy.intercept('/users/403', {
      statusCode: 403,
    });
    cy.get(getDataCy(loginCy.userNameInput)).type('403');
    cy.get(getDataCy(loginCy.userNameBtn)).click();
    cy.on('alert', (t) => {
      //assertions
      expect(t).to.contains(customHttpErrors.unexpectedError);
    });
  });
});
