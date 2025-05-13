describe('Создание вакансии', () => {
    it('Работодатель авторизуется и создает вакансию', () => {
        // Шаг 1: Авторизация
        cy.visit('https://dev.profteam.su/login ');

        cy.get('input[type=text]').type('testerEmployer'); // Логин
        cy.get('input[type=password]').type('Password1'); // Пароль
        cy.get('button[type=submit]').contains('Войти').click(); // Клик по кнопке "Войти"

        // Проверка успешной авторизации
        cy.url().should('include', '/main');

        // Шаг 2: Переход на страницу создания вакансии
        cy.get('.menu-item__item-name').contains('Вакансии').click(); // Переход в раздел "Вакансии"
        cy.contains('Создать вакансию').click();

        // Проверка открытия формы создания вакансии
        cy.get('.form').should('be.visible');

        // Шаг 3: Заполнение формы
        // Ввод названия вакансии
        cy.get('[name="title"]').type('Кладовщик'); // Название вакансии

        // Ввод работодателя
        cy.get('[name="employer"]').type('Example Company'); // Работодатель

        // Ввод заработной платы
        cy.get('[name="salaryFrom"]').type('60000'); // Минимальная зарплата
        cy.get('[name="salaryTo"]').type('80000'); // Максимальная зарплата

        // Выбор типа занятости
        cy.get('[name="employmentType"]').select('Полная занятость');

        // Выбор графика работы
        cy.get('[name="workSchedule"]').select('5/2');

        // Ввод обязанностей
        cy.get('[name="responsibilities"]').type('Разработка и тестирование кода');

        // Ввод требований
        cy.get('[name="requirements"]').type('Опыт работы от 1 года');

        // Шаг 4: Отправка формы
        cy.contains('button', 'Сохранить как черновик').click();

        // Проверка успешного создания вакансии
        cy.contains('Вакансия сохранена как черновик').should('be.visible');

        // Проверка корректности данных
        cy.get('[placeholder="Кладовщик"]').should('have.value', 'Junior Developer');
        cy.get('[name="employer"]').should('have.value', 'Example Company');
        cy.get('[name="salaryFrom"]').should('have.value', '60000');
        cy.get('[name="salaryTo"]').should('have.value', '80000');
        cy.get('[name="employmentType"]').should('have.value', 'Полная занятость');
        cy.get('[name="workSchedule"]').should('have.value', '5/2');
        cy.get('[name="responsibilities"]').should('have.value', 'Разработка и тестирование кода');
        cy.get('[name="requirements"]').should('have.value', 'Опыт работы от 1 года');
    });
});