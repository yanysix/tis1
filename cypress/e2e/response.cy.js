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
        cy.get('.vacancy-item--approved', { timeout: 15000 }).should('exist');

        // Находим первую карточку с кнопкой "Откликнуться" и нажимаем
        cy.get('.vacancy-item--approved').filter((index, el) => {
            return Cypress.$(el).find('button:contains("Откликнуться")').length > 0;
        }).first().within(() => {
            cy.contains('button', 'Откликнуться').click();
        });
    });
});

describe('Отклик на потребность', () => {
    it('Негативный сценарий — отсутствие доступных потребностей для отклика', () => {
        // Шаг 1: Переход на страницу логина
        cy.visit('https://dev.profteam.su/login ');

        // Шаг 2: Авторизация
        cy.get('input[type=text]').type('testerStudenttt');
        cy.get('input[type=password]').type('Password1');
        cy.get('button[type=submit]').eq(2).click();

        // Проверка успешной авторизации
        cy.url().should('include', '/account/main');

        // Шаг 3: Переход в раздел потребностей
        cy.get('.page > header:nth-child(1) > nav > a:nth-child(1)').click();

        // Ждем переход на страницу потребностей
        cy.url().should('include', '/vacancies'); // Замените на правильный URL, если это /needs

        // Ждем появления карточек
        cy.get('body').then(($body) => {
            if ($body.find('.vacancy-item--approved').length === 0) {
                // Если карточки отсутствуют, выводим сообщение
                cy.log('Нет доступных карточек для отклика — негативный сценарий подтвержден.');
            } else {
                // Если карточки есть, проверяем, что кнопка "Откликнуться" недоступна
                cy.get('.vacancy-item--approved').each(($card) => {
                    const hasButton = Cypress.$($card).find('button:contains("Откликнуться")').length > 0;
                    expect(hasButton).to.be.false; // Проверяем, что кнопки "Откликнуться" нет
                });
            }
        });
    });
});
