import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { CY_BTN_REMOVE, CY_BTN_CLEAR, CY_BTN_SUBMIT, CY_CIRCLE, CY_FORM, CY_INPUT } from "../cyConstants/cyConstants";

describe('testing the correct operation of the stack component', () => {

  beforeEach(() => {
    cy.visit('/stack');
  });

  it('checking that if the input is empty, then the add button is not available', () =>  {
    cy.get(CY_FORM).within(() => {
      cy.get(CY_INPUT).should('be.empty')
      cy.get(CY_BTN_SUBMIT).should('have.text', 'Добавить').should('be.disabled');
    });
  })

  const addItem = (value) => {
    cy.clock();
    cy.get(CY_FORM).within(() => {
      cy.get(CY_INPUT).type(value);
      cy.get(CY_BTN_SUBMIT).click();
    })
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CY_CIRCLE).contains(value).parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));
    cy.tick(SHORT_DELAY_IN_MS);
  }

  it('check for adding items', () => {
    cy.clock();
    addItem('55');
    cy.get(CY_CIRCLE).invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))

    addItem('215');
    cy.get(CY_CIRCLE).then(item => {
        cy.get(item[0])
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))
        cy.get(item[0])
            .children().should('have.text', '55')
        cy.get(item[1])
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))
        cy.get(item[1])
            .children().should('have.text', '215')
    });

    addItem('4');
    cy.get(CY_CIRCLE).then(item => {
        cy.get(item[0])
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))
        cy.get(item[0])
            .children().should('have.text', '55')
        cy.get(item[1])
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))
        cy.get(item[1])
            .children().should('have.text', '215')
        cy.get(item[2])
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))
        cy.get(item[2])
            .children().should('have.text', '4')
    });
  })

  it('check for remove items', () => {
    cy.clock();
    addItem('333');
    cy.tick(SHORT_DELAY_IN_MS);
    addItem('29');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CY_BTN_REMOVE).click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CY_CIRCLE).then(item => {
        cy.get(item[0])
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'));
        cy.get(item[0])
            .children().should('have.text', '333');
    });
  })

  it('check for clear stack', () => {
    cy.clock();
    addItem('784');
    cy.tick(SHORT_DELAY_IN_MS);
    addItem('82');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CY_BTN_CLEAR).click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CY_CIRCLE).should('have.length', 0);
  });
})