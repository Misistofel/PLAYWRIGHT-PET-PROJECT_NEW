
import { expect, test } from "../utils/fixtures/pagesFixtures";
import GarageService from "../utils/api/services/GarageService";
import { getSidFromStorageState } from "../utils/storageState/storageState";
import { faker } from '@faker-js/faker';
import {generateExpenseData} from "../utils/factories/expenses.factory";


test.describe('Fuel expenses tests', () => {

    let garageService: GarageService;

    test.use({ storageState: '.states/testuser2.json' });

    test.beforeEach(async ({ request }) => {
        garageService = new GarageService(request);
        const sid = getSidFromStorageState('.states/testuser2.json');
        await garageService.addCar(sid, 1, 1, 999);
    })

    test('Correct adding of expense with valid data', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData();

        const currentDate = new Date().toISOString();

        const year = currentDate.slice(0, 4);
        const month = currentDate.slice(5, 7);
        const day = currentDate.slice(8, 10);

        const formattedDate = `${day}.${month}.${year}`;

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.addNewExpense(mileage,  totalCost,  numberOfLiters)
        await app.expensesPage.verifyLastExpense(formattedDate, mileage, numberOfLiters, totalCost);
    })

    test('Validation - future date', async ({ app }) => {
        const newMileage = String(faker.number.int({ min: 1000, max: 3000 }));
        const numberOfLiters = String(faker.number.int({   min: 10, max: 50 }));
        const totalCost = String(faker.number.int({   min: 10, max: 500 }));
        const futureDate = faker.date.future().toISOString();//це метод faker 

        

        console.log(futureDate);

        const year = futureDate.slice(0, 4);
        const month = futureDate.slice(5, 7);
        const day = futureDate.slice(8, 10);

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.addNewExpense(newMileage, totalCost, numberOfLiters, undefined, `${day}.${month}.${year}`);
        await expect(app.addExpenseForm.futureDateErrorMessage).toBeVisible();

    })
        test('Validation -  adding expense with current number of mileage', async ({ app }) => {
        const numberOfLiters = String(faker.number.int({   min: 10, max: 50 }));
        const totalCost = String(faker.number.int({   min: 10, max: 500 }));

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        const newMileage = await app.addExpenseForm.mileageField.inputValue();
        await app.addExpenseForm.addNewExpense(newMileage, totalCost, numberOfLiters);

        await expect(app.addExpenseForm.mileageErrorMessage).toBeVisible();
    
    })

        test('Validation -  zero or negative number of liters', async ({ app }) => {
        const newMileage = String(faker.number.int({ min: 1000, max: 3000 }));
        const numberOfLiters = String(faker.number.int({ min: -10, max: 0 }));

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.enterMileage(newMileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.page.keyboard.press('Tab');

        await expect(app.addExpenseForm.zeroOrEqualLitersErrorMessage).toBeVisible();
    
    })

   
        test('Validation -  zero or negative total cost', async ({ app }) => {
        const newMileage = String(faker.number.int({ min: 1000, max: 3000 }));
        const numberOfLiters = String(faker.number.int({   min: 10, max: 50 }));
        const totalCost = String(faker.number.int({ min: -10,max: 0 }));

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.enterMileage(newMileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);
        await app.page.keyboard.press('Tab');

        await expect(app.addExpenseForm.zeroOrNegativeTotalCostErrorMessage).toBeVisible();
    
    })

        test('Validation - more than 9999 liters', async ({ app }) => {
        const newMileage = String(faker.number.int({ min: 1000, max: 3000 }));
        const numberOfLiters = String(faker.number.int({   min: 10000, max: 100000 }));

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.enterMileage(newMileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.page.keyboard.press('Tab');

        await expect(app.addExpenseForm.moreThanMaxLitersErrorMessage).toBeVisible();
    
    })

  ////   
        test('Validation - more than 1000000 total cost', async ({ app }) => {
        const newMileage = String(faker.number.int({ min: 1000, max: 3000 }));
        const numberOfLiters = String(faker.number.int({   min: 10, max: 50 }));
        const totalCost = String(faker.number.int({   min: 1000001, max: 1000100 }));


        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.enterMileage(newMileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);
        await app.page.keyboard.press('Tab');

        await expect(app.addExpenseForm.moreThanMaxTotalCostErrorMessage).toBeVisible();
    
    })



})

