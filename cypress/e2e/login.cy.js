describe('Создание вакансии', () => {
    it('Работодатель авторизуется и создает вакансию', () => {
        // Загрузка данных из fixtures
        cy.fixture('vacancyData').then((data) => {
            // Шаг 1: Авторизация
            cy.visit('https://dev.profteam.su/login ');

            cy.get('input[type=text]').type('testerEmployer'); // Логин
            cy.get('input[type=password]').type('Password1'); // Пароль
            cy.get('button[type=submit]').contains('Войти').click(); // Клик по кнопке "Войти"

            // Проверка успешной авторизации
            cy.url().should('include', '/account/main');

            // Шаг 2: Переход на страницу создания вакансии
            cy.get('.menu-item__item-name').contains('Вакансии').click(); // Переход в раздел "Вакансии"
            cy.get('[data-testid="create-vacancy-button"]').click(); // Кнопка "Создать вакансию"

            // Проверка открытия формы создания вакансии
            cy.get('.vacancy-form').should('be.visible');

            // Шаг 3: Заполнение формы
            cy.get('[name="title"]').type(data.vacancyTitle); // Название вакансии
            cy.get('[name="employer"]').type(data.employer); // Работодатель
            cy.get('[name="salaryFrom"]').type(data.salaryFrom); // Минимальная зарплата
            cy.get('[name="salaryTo"]').type(data.salaryTo); // Максимальная зарплата
            cy.get('[name="employmentType"]').select(data.employmentType); // Тип занятости
            cy.get('[name="workSchedule"]').select(data.workSchedule); // График работы
            cy.get('[name="responsibilities"]').type(data.responsibilities); // Обязанности
            cy.get('[name="requirements"]').type(data.requirements); // Требования

            // Шаг 4: Отправка формы
            cy.contains('button', 'Сохранить как черновик').click();

            // Проверка успешного создания вакансии
            cy.contains('Вакансия сохранена как черновик').should('be.visible');

            // Проверка корректности данных
            cy.get('[name="title"]').should('have.value', data.vacancyTitle);
            cy.get('[name="employer"]').should('have.value', data.employer);
            cy.get('[name="salaryFrom"]').should('have.value', data.salaryFrom);
            cy.get('[name="salaryTo"]').should('have.value', data.salaryTo);
            cy.get('[name="employmentType"]').should('have.value', data.employmentType);
            cy.get('[name="workSchedule"]').should('have.value', data.workSchedule);
            cy.get('[name="responsibilities"]').should('have.value', data.responsibilities);
            cy.get('[name="requirements"]').should('have.value', data.requirements);
        });
    });
});