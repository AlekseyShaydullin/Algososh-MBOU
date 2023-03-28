import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { CY_BTN_CLEAR, CY_BTN_REMOVE, CY_BTN_SUBMIT, CY_CIRCLE, CY_FORM, CY_HEAD_CIRCLE, CY_INPUT, CY_TAIL_CIRCLE } from "../cyConstants/cyConstants";

describe('testing the correct operation of the queue component', () => {

  beforeEach(() => {
    cy.visit('/queue');
  });

  it('checking that if the input is empty, then the add button is not available', () =>  {
    cy.get(CY_FORM).within(() => {
      cy.get(CY_INPUT).should('be.empty')
      cy.get(CY_BTN_SUBMIT).should('have.text', 'Добавить').should('be.disabled');
      cy.get(CY_BTN_REMOVE).should('have.text', 'Удалить').should('be.disabled');
      cy.get(CY_BTN_CLEAR).should('have.text', 'Очистить').should('be.disabled');
    });
  });

  it('check for adding items', () => {
    cy.clock();
    cy.get(CY_INPUT).type('548');
    cy.get(CY_BTN_SUBMIT).click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CY_HEAD_CIRCLE).should(div => expect(div).to.have.text('head'));
    cy.get(CY_TAIL_CIRCLE).should(div => expect(div).to.have.text('tail'));

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CY_INPUT).type('185');
    cy.get(CY_BTN_SUBMIT).click();
    cy.get(CY_HEAD_CIRCLE).first().should(div => expect(div).to.have.text('head'));
    cy.get(CY_CIRCLE).contains('548').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));

    cy.get(CY_TAIL_CIRCLE).eq(1).should(div => expect(div).to.have.text('tail'));
    cy.get(CY_CIRCLE).contains('185').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'));
    cy.get(CY_INPUT).should('be.empty');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CY_INPUT).type('55');
    cy.get(CY_BTN_SUBMIT).click();
    cy.get(CY_HEAD_CIRCLE).first().should(div => expect(div).to.have.text('head'));
    cy.get(CY_CIRCLE).contains('55').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'));
    cy.get(CY_TAIL_CIRCLE).eq(2).should(div => expect(div).to.have.text('tail'));
    cy.get(CY_CIRCLE).contains('185').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));
    cy.get(CY_INPUT).should('be.empty');

    cy.tick(SHORT_DELAY_IN_MS);
  });

  it('check for remove items', () => {
    cy.clock();
    cy.get(CY_INPUT).type('587');
    cy.get(CY_BTN_SUBMIT).click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CY_INPUT).type('74');
    cy.get(CY_BTN_SUBMIT).click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CY_INPUT).type('68');
    cy.get(CY_BTN_SUBMIT).click();
    cy.get(CY_HEAD_CIRCLE).first().should(div => expect(div).to.have.text('head'));
    cy.get(CY_TAIL_CIRCLE).eq(2).should(div => expect(div).to.have.text('tail'));

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CY_BTN_REMOVE).click();
    cy.get(CY_CIRCLE).first().invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CY_CIRCLE).first().should(div => expect(div).to.have.text(''))
      .invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));
  })

  it('check clear queue', () => {
    cy.clock();
    cy.get(CY_INPUT).type('5');
    cy.get(CY_BTN_SUBMIT).click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CY_INPUT).type('8');
    cy.get(CY_BTN_SUBMIT).click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CY_INPUT).type('22');
    cy.get(CY_BTN_SUBMIT).click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CY_BTN_CLEAR).click();
    
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CY_CIRCLE).each($item => {
        expect($item).to.have.text('');
        expect($item).to.have.attr('class').contains('circle_default');
    });
  })
})