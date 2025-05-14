describe('Создание вакансии', () => {
    it('Работодатель авторизуется и создает вакансию', () => {
        // Шаг 1: Авторизация
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type=text]').type('testerEmployer'); // Логин
        cy.get('input[type=password]').type('Password1'); // Пароль
        cy.get('button[type=submit]').contains('Войти').click(); // Клик по кнопке "Войти"

        // Проверка успешной авторизации
        cy.url().should('include', '/main');

        // Шаг 2: Переход на страницу создания вакансии
        cy.get('.menu-item__item-name').contains('Вакансии').click(); // Переход в раздел "Вакансии"
        cy.contains('Создать вакансию').click(); // Клик по кнопке "Создать вакансию"

        // Проверка открытия формы создания вакансии
        cy.get('.form').should('be.visible');

        // Шаг 3: Заполнение формы
        // Ввод названия вакансии
        cy.get('[placeholder="Название вакансии(должность)"]', { timeout: 5000 })
            .should('be.visible')
            .type('Кладовщик');

        // Выбор типа занятости (кастомный выпадающий список)
        cy.get('.form-select__selected').click(); // Открываем выпадающий список
        cy.contains('.form-select__items > div', 'Очный') // Выбираем пункт "Очный"
            .should('be.visible')
            .click();

        // Выбор графика работы (5/2)
        cy.get('.radio-component input[type="radio"][value="5/2"]')
            .should('exist')
            .then(($radio) => {
                if ($radio.is(':visible')) {
                    $radio.click(); // Кликаем, если радиокнопка видима
                } else {
                    cy.get('.radio-component label').contains('5/2').click();
                }
            });

        // Ввод обязанностей
        cy.get('[name="responsibilities"]', { timeout: 5000 })
            .should('be.visible')
            .type('Разработка и тестирование кода');

        // Ввод требований
        cy.get('[name="requirements"]', { timeout: 5000 })
            .should('be.visible')
            .type('Опыт работы от 1 года');

        // Шаг 4: Отправка формы
        cy.contains('button', 'Сохранить').click();

    });
});
