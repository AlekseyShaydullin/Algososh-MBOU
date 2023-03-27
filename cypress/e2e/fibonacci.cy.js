import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { CY_BTN_SUBMIT, CY_CIRCLE, CY_FORM, CY_INPUT } from "../cyConstants/cyConstants";

describe('testing the correct operation of the fibonacci sequence component', () => {

  beforeEach(() => {
    cy.visit('/fibonacci');
  });

  it('checking that if the input is empty, then the add button is not available', () => {
    cy.get(CY_FORM).within(() => {
      cy.get(CY_INPUT).should('be.empty')
      cy.get(CY_BTN_SUBMIT).should('have.text', 'Рассчитать').should('be.disabled');
    })
  });

  it('numbers should be generated correctly', () => {

    cy.get(CY_FORM).within(() => {
      const inputNumber = 5;
      const refArr = [1, 1, 2, 3, 5, 8];

      cy.get(CY_INPUT).type(String(inputNumber));
      cy.get(CY_BTN_SUBMIT).click();

      cy.wait(Number(SHORT_DELAY_IN_MS));

      cy.get(CY_CIRCLE).should('have.length', refArr.length).each((el, index) => {
        const expectedNumber = refArr[index];
        expect(el).to.contain(expectedNumber.toString());
      })
    })
  })

})