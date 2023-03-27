import { CY_BTN_SUBMIT, CY_CIRCLE, CY_FORM, CY_INPUT } from "../cyConstants/cyConstants";
import { DELAY_IN_MS } from "../../src/constants/delays"

describe('testing a component that reverses a string', () => {

  beforeEach(() => {
    cy.visit('/recursion');
  });

  it('checking that if the input is empty, then the add button is not available', () => {
    cy.get(CY_FORM).within(() => {
      cy.get('input').should('be.empty')
      cy.get(CY_BTN_SUBMIT).should('have.text', 'Развернуть').should('be.disabled');
    })
  });

  it('checking that the string expands correctly', () => {
    cy.clock();

    cy.get(CY_FORM).within(() => {
      cy.get(CY_INPUT).type('door');
      cy.get(CY_BTN_SUBMIT).click();
    });

    cy.get(CY_CIRCLE).then((letter) => {
      cy.get(letter[0]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'));
      cy.get(letter[0])
      .children().should('have.text', 'd');
      cy.get(letter[1]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'));
      cy.get(letter[1])
      .children().should('have.text', 'o');
      cy.get(letter[2]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'));
      cy.get(letter[2])
      .children().should('have.text', 'o');
      cy.get(letter[3]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'));
      cy.get(letter[3])
      .children().should('have.text', 'r');
    });

    cy.tick(DELAY_IN_MS);

    cy.get(CY_CIRCLE).then((letter) => {
      cy.get(letter[0]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'));
      cy.get(letter[0])
      .children().should('have.text', 'd');
      cy.get(letter[1]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'));
      cy.get(letter[1])
      .children().should('have.text', 'o');
      cy.get(letter[2]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'));
      cy.get(letter[2])
      .children().should('have.text', 'o');
      cy.get(letter[3]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'));
      cy.get(letter[3])
      .children().should('have.text', 'r');
    });

    cy.tick(DELAY_IN_MS);

    cy.get(CY_CIRCLE).then((letter) => {
      cy.get(letter[0]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_modified'));
      cy.get(letter[0])
      .children().should('have.text', 'r');
      cy.get(letter[1]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'));
      cy.get(letter[1])
      .children().should('have.text', 'o');
      cy.get(letter[2]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'));
      cy.get(letter[2])
      .children().should('have.text', 'o');
      cy.get(letter[3]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_modified'));
      cy.get(letter[3])
      .children().should('have.text', 'd');
    });

    cy.tick(DELAY_IN_MS);

    cy.get(CY_CIRCLE).then((letter) => {
      cy.get(letter[0]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_modified'));
      cy.get(letter[0])
      .children().should('have.text', 'r');
      cy.get(letter[1]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_modified'));
      cy.get(letter[1])
      .children().should('have.text', 'o');
      cy.get(letter[2]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_modified'));
      cy.get(letter[2])
      .children().should('have.text', 'o');
      cy.get(letter[3]).invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_modified'));
      cy.get(letter[3])
      .children().should('have.text', 'd');
    });
  })
})