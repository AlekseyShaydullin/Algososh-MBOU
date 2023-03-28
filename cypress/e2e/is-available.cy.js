describe('application is available', () => {
  
  it('application main page available', () => {
    cy.visit('/');
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('application string page available', () => {
    cy.visit('/recursion');
    cy.get('h3').should('have.text', 'Строка');
  });

  it('application fibonacci page available', () => {
    cy.visit('/fibonacci');
    cy.get('h3').should('have.text', 'Последовательность Фибоначчи');
  });

  it('application sorting page available', () => {
    cy.visit('/sorting');
    cy.get('h3').should('have.text', 'Сортировка массива');
  });

  it('application stack page available', () => {
    cy.visit('/stack');
    cy.get('h3').should('have.text', 'Стек');
  });

  it('application queue page available', () => {
    cy.visit('/queue');
    cy.get('h3').should('have.text', 'Очередь');
  });

  it('application list page available', () => {
    cy.visit('/list');
    cy.get('h3').should('have.text', 'Связный список');
  });
})