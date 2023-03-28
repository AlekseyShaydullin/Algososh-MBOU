import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { CY_BTN_ADD_HEAD, 
  CY_BTN_ADD_INDEX, 
  CY_BTN_ADD_TAIL, 
  CY_BTN_DELETE_HEAD, 
  CY_BTN_DELETE_INDEX, 
  CY_BTN_DELETE_TAIL, 
  CY_CIRCLE, 
  CY_FORM, 
  CY_FORM_INDEX, 
  CY_HEAD_CIRCLE, 
  CY_INPUT_INDEX, 
  CY_INPUT_LETTER, 
  CY_TAIL_CIRCLE
} from "../cyConstants/cyConstants";

describe('testing the correct operation of the list component', () => {
  
  beforeEach(() => {
    cy.visit('/list')
  });

  it('checking that if the input is empty, then the add button is not available', () =>  {
    cy.get(CY_FORM).within(() => {
      cy.get(CY_INPUT_LETTER).should('be.empty');
      cy.get(CY_BTN_ADD_HEAD).should('have.text', 'Добавить в head').should('be.disabled');
      cy.get(CY_BTN_ADD_TAIL).should('have.text', 'Добавить в tail').should('be.disabled');
      cy.get(CY_BTN_DELETE_HEAD).should('have.text', 'Удалить из head');
      cy.get(CY_BTN_DELETE_TAIL).should('have.text', 'Удалить из tail');
    });

    cy.get(CY_FORM_INDEX).within(() => {
      cy.get(CY_INPUT_INDEX).should('be.empty');
      cy.get(CY_BTN_ADD_INDEX).should('have.text', 'Добавить по индексу').should('be.disabled');
      cy.get(CY_BTN_DELETE_INDEX).should('have.text', 'Удалить по индексу');
    });
  });

  it('checking the rendering of the default list', () => {
    cy.get(CY_CIRCLE).should('have.length', 4).invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'));
    cy.get(CY_HEAD_CIRCLE).first().should(div => expect(div).to.have.text('head'));
    cy.get(CY_TAIL_CIRCLE).eq(3).should(div => expect(div).to.have.text('tail'));
    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[0]).children().should('have.text', '0');
      cy.get(item[1]).children().should('have.text', '34');
      cy.get(item[2]).children().should('have.text', '8');
      cy.get(item[3]).children().should('have.text', '1');
    });

    cy.wait(Number(DELAY_IN_MS));
  });

  it('checking the correct addition of the item to the head', () => {
    cy.get(CY_INPUT_LETTER).type('58');
    cy.get(CY_BTN_ADD_HEAD).click();

    cy.wait(Number(SHORT_DELAY_IN_MS));

    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[0]).children().should('have.text', '58');
      cy.get(item[0]).invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'));
    });

    cy.wait(Number(DELAY_IN_MS));
  });

  it('checking the correct addition of the item to the tail', () => {
    cy.get(CY_INPUT_LETTER).type('78');
    cy.get(CY_BTN_ADD_TAIL).click();

    cy.wait(Number(SHORT_DELAY_IN_MS));

    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[4]).children().should('have.text', '78');
      cy.get(item[4]).invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'));
    });

    cy.wait(Number(DELAY_IN_MS));
  });

  it('checking correct removal of the item from the head', () => {
    cy.get(CY_BTN_DELETE_HEAD).click();

    cy.wait(Number(SHORT_DELAY_IN_MS));

    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[0]).children().should('have.text', '34');
      cy.get(item[1]).children().should('have.text', '8');
      cy.get(item[2]).children().should('have.text', '1');
    });

    cy.wait(Number(DELAY_IN_MS));
  });

  it('checking correct removal of the item from the tail', () => {
    cy.get(CY_BTN_DELETE_TAIL).click();

    cy.wait(Number(SHORT_DELAY_IN_MS));

    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[0]).children().should('have.text', '0');
      cy.get(item[1]).children().should('have.text', '34');
      cy.get(item[2]).children().should('have.text', '8');
    });

    cy.wait(Number(DELAY_IN_MS));
    });
  
  it('check for adding an item by index', () => {
    cy.get(CY_INPUT_INDEX).type(2);
    cy.get(CY_INPUT_LETTER).type('575');
    cy.get(CY_BTN_ADD_INDEX).click();

    cy.wait(Number(SHORT_DELAY_IN_MS));

    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[0]).children().should('have.text', '575')
      cy.get(item[0]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
      cy.get(item[1]).children().should('have.text', '0');
      cy.get(item[1]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
      cy.get(item[2]).children().should('have.text', '34');
      cy.get(item[2]).invoke('attr','class').then(classList => expect(classList).contains('circle_default'));
    });

    cy.wait(Number(SHORT_DELAY_IN_MS));

    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[0]).children().should('have.text', '0')
      cy.get(item[0]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
      cy.get(item[1]).children().should('have.text', '575');
      cy.get(item[1]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
      cy.get(item[2]).children().should('have.text', '34');
      cy.get(item[2]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
    });

    cy.wait(Number(SHORT_DELAY_IN_MS));

    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[0]).children().should('have.text', '0')
      cy.get(item[0]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
      cy.get(item[1]).children().should('have.text', '34');
      cy.get(item[1]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
      cy.get(item[2]).children().should('have.text', '575');
      cy.get(item[2]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
    });
  });

  it('check for removing an item by index', () => {
    cy.get(CY_INPUT_INDEX).type(2);
    cy.get(CY_BTN_DELETE_INDEX).click();

    cy.wait(Number(SHORT_DELAY_IN_MS));

    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[0]).children().should('have.text', '0');
      cy.get(item[0]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
      cy.get(item[1]).children().should('have.text', '34');
      cy.get(item[1]).invoke('attr','class').then(classList => expect(classList).contains('circle_default'));
      cy.get(item[2]).children().should('have.text', '8');
      cy.get(item[2]).invoke('attr','class').then(classList => expect(classList).contains('circle_default'));
      cy.get(item[3]).children().should('have.text', '1');
      cy.get(item[3]).invoke('attr','class').then(classList => expect(classList).contains('circle_default'));
    });

    cy.wait(Number(SHORT_DELAY_IN_MS));

    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[0]).children().should('have.text', '0');
      cy.get(item[0]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'))
      cy.get(item[1]).children().should('have.text', '34');
      cy.get(item[1]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
      cy.get(item[2]).children().should('have.text', '8');
      cy.get(item[2]).invoke('attr','class').then(classList => expect(classList).contains('circle_default'));
      cy.get(item[3]).children().should('have.text', '1');
      cy.get(item[3]).invoke('attr','class').then(classList => expect(classList).contains('circle_default'));
    });

    cy.wait(Number(SHORT_DELAY_IN_MS));

    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[0]).children().should('have.text', '0');
      cy.get(item[0]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'))
      cy.get(item[1]).children().should('have.text', '34');
      cy.get(item[1]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
      cy.get(item[2]).children().should('have.text', '8');
      cy.get(item[2]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
      cy.get(item[3]).children().should('have.text', '1');
      cy.get(item[3]).invoke('attr','class').then(classList => expect(classList).contains('circle_default'));
    });

    cy.wait(Number(SHORT_DELAY_IN_MS));

    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[0]).children().should('have.text', '0');
      cy.get(item[0]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'))
      cy.get(item[1]).children().should('have.text', '34');
      cy.get(item[1]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
      cy.get(item[2]).children().should('have.text', '8');
      cy.get(item[2]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'));
    });

    cy.wait(Number(SHORT_DELAY_IN_MS));

    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[0]).children().should('have.text', '0');
      cy.get(item[0]).invoke('attr','class').then(classList => expect(classList).contains('circle_changing'))
      cy.get(item[1]).children().should('have.text', '34');
      cy.get(item[1]).invoke('attr','class').then(classList => expect(classList).contains('circle_modified'));
      cy.get(item[2]).children().should('have.text', '1');
      cy.get(item[2]).invoke('attr','class').then(classList => expect(classList).contains('circle_default'));
    });

    cy.wait(Number(SHORT_DELAY_IN_MS));

    cy.get(CY_CIRCLE).then(item => {
      cy.get(item[0]).children().should('have.text', '0');
      cy.get(item[0]).invoke('attr','class').then(classList => expect(classList).contains('circle_default'))
      cy.get(item[1]).children().should('have.text', '34');
      cy.get(item[1]).invoke('attr','class').then(classList => expect(classList).contains('circle_default'));
      cy.get(item[2]).children().should('have.text', '1');
      cy.get(item[2]).invoke('attr','class').then(classList => expect(classList).contains('circle_default'));
    });
  })
})