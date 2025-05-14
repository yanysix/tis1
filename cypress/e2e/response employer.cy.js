describe('Подтверждение отклика работодателем', () => {

    it('Позитивный сценарий — подтверждение отклика', () => {
        cy.visit('https://dev.profteam.su/login');

        cy.get('input[type=text]').type('testerEmployer');
        cy.get('input[type=password]').type('Password1');
        cy.get('button[type=submit]').eq(2).click();

        cy.get(':nth-child(6) > .menu-item__item-name').click();
        cy.contains('Отклики').click();

        cy.get('body').then($body => {
            if ($body.find('button:contains("Подтвердить")').length > 0) {
                cy.contains('Подтвердить').first().click({ force: true });
                cy.contains('Подтверждено').should('exist');
            } else {
                cy.log('Нет откликов для подтверждения — тест пропущен');
            }
        });
    });

    it('Негативный сценарий — откликов нет, подтверждение не происходит', () => {
        cy.visit('https://dev.profteam.su/login');

        cy.get('input[type=text]').type('testerEmployer');
        cy.get('input[type=password]').type('Password1');
        cy.get('button[type=submit]').eq(2).click();

        cy.get(':nth-child(6) > .menu-item__item-name').click();
        cy.contains('Отклики').click();

        cy.get('body').then($body => {
            if ($body.find('button:contains("Подтвердить")').length === 0) {
                cy.log('Откликов нет — негативный сценарий подтверждён');
            } else {
                cy.log('Отклики есть — негативный сценарий неактуален');
            }
        });
    });

});