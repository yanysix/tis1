describe('Фильтрация вакансии', () => {
    it('Поиск нужной вакансии', () => {
        // Шаг 1: Переход на главную страницу
        cy.visit('https://dev.profteam.su/vacancies?start_price=0&end_price=0');

        cy.get('.form-input--text').type('Менеджер');
        cy.get(':nth-child(1) > .radio-component__input').click();
        cy.get(':nth-child(1) > .form-control--responsive > .form-input--number').type(10000);
        cy.get(':nth-child(2) > .form-control--responsive > .form-input--number').type(50000);
        cy.get(':nth-child(3) > :nth-child(2) > .form-select__selected').click();
        cy.get('.form-select__items > :nth-child(2)').click();
        cy.get(':nth-child(4) > :nth-child(2) > .form-select__selected').click();
        cy.get('.form-select__items > :nth-child(2)').click();
    });
});

describe('Фильтрация вакансии — негативный сценарий', () => {
    it('Фильтр не находит вакансий', () => {
        // Переход на страницу вакансий
        cy.visit('https://dev.profteam.su/vacancies?start_price=0&end_price=0');

        // Ввод данных, которые гарантированно не дадут результатов
        cy.get('.form-input--text').type('Несуществующая вакансия');
        cy.get(':nth-child(1) > .radio-component__input').click(); // По диапазону

        // Указываем слишком высокий диапазон
        cy.get(':nth-child(1) > .form-control--responsive > .form-input--number').type(999999);
        cy.get(':nth-child(2) > .form-control--responsive > .form-input--number').type(1000000);

        // Выбираем тип занятости, если требуется
        cy.get(':nth-child(3) > :nth-child(2) > .form-select__selected').click();
        cy.get('.form-select__items > :nth-child(2)').click(); // Например, "Очный"

    });
});