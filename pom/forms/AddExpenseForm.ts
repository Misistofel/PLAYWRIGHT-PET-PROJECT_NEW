import { expect } from '@playwright/test'
import { BaseForm } from './BaseForm';

export class AddExpenseForm extends BaseForm {

    public readonly formTitle = this.page.locator('.modal-title', { hasText: 'Add an expense' });
    public readonly vehicleDropdown = this.page.locator('#addExpenseCar');
    private readonly reportDateField = this.page.locator('#addExpenseDate');
    public readonly mileageField = this.page.locator('#addExpenseMileage');
    private readonly numberOfLitersField = this.page.locator('#addExpenseLiters');
    public readonly totalCostField = this.page.locator('#addExpenseTotalCost');
    public readonly addExpenseButton = this.page.getByRole('button', { name: 'Add', exact: true })
    public readonly futureDateErrorMessage = this.page.locator('.alert-danger', {hasText:'Report date has to be less than tomorrow'});
    public readonly mileageErrorMessage = this.page.locator('.alert-danger',{hasText:`First expense mileage must not be 
        less or equal to car initial mileage. Car initial mileage is 999`});
    public readonly zeroOrEqualLitersErrorMessage = this.page.getByText('Liters has to be from 0.01 to 9999');   
    public readonly zeroOrNegativeTotalCostErrorMessage = this.page.getByText('Total cost has to be from 0.01 to 1000000');
    public readonly moreThanMaxLitersErrorMessage = this.page.getByText('Liters has to be from 0.01 to 9999');
    public readonly moreThanMaxTotalCostErrorMessage = this.page.getByText('Total cost has to be from 0.01 to 1000000');



    async addNewExpense(mileage: string, totalCost: string, numberOfLiters: string, vehicle?: string, reportDate?: string) {
        await expect(this.vehicleDropdown).toBeEnabled();
        if (vehicle) {
            await this.selectVehicle(vehicle);
        }
        if (reportDate) {
            await this.enterReportDate(reportDate);
        }
        await this.enterMileage(mileage);
        await this.enterTotalCost(totalCost);
        await this.enterNumberOfLiters(numberOfLiters);
        await this.clickAddExpense();
    }

    async selectVehicle(vehicle: string) {
        await this.vehicleDropdown.selectOption(vehicle);
    }

    async enterReportDate(date: string) {
        await this.reportDateField.fill(date);
    }

    async enterMileage(mileage: string) {
        await this.mileageField.fill(mileage);
    }

    async enterTotalCost(totalCost: string) {
        await this.totalCostField.fill(totalCost);
    }

    async enterNumberOfLiters(numberOfLiters: string) {
        await this.numberOfLitersField.fill(numberOfLiters);
    }

    async clickAddExpense() {
        await this.addExpenseButton.click();
    }






    // async clickAddCarButton() {
    //     await this.addCarButton.click();
    // }

    // async clickCancelButton() {
    //     await this.cancelButton.click();
    // }

    // async clickCloseIcon() {
    //     await this.closeIcon.click();
    // }

}