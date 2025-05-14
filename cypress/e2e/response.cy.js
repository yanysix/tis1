describe('Отклик на потребность', () => {
    it('Студент откликается на первую доступную потребность', () => {
        // Шаг 1: Переход на страницу логина
        cy.visit('https://dev.profteam.su/login');

        // Шаг 2: Авторизация
        cy.get('input[type=text]').type('testerStudenttt');
        cy.get('input[type=password]').type('Password1');
        cy.get('button[type=submit]').eq(2).click();

        // Проверка успешной авторизации
        cy.url().should('include', '/account/main');

        // Шаг 3: Переход в раздел потребностей
        cy.get('.page > header:nth-child(1) > nav > a:nth-child(1)').click();

        // Ждем переход на страницу вакансий
        cy.url().should('include', '/vacancies');

        // Ждем появления карточек
        cy.get('.vacancies-item', { timeout: 15000 }).should('exist');

        // Находим первую карточку с кнопкой "Откликнуться" и нажимаем
        cy.get('.vacancies-item').filter((index, el) => {
            return Cypress.$(el).find('button:contains("Откликнуться")').length > 0;
        }).first().within(() => {
            cy.contains('button', 'Откликнуться').click();
        });

        // Дополнительная проверка: убедитесь, что отклик был успешно отправлен
        cy.contains('Ваш отклик успешно отправлен').should('be.visible'); // Замените текст на актуальный для вашего приложения
    });
});
