import { LightningElement, track } from 'lwc';
import createBankAccount from '@salesforce/apex/BankingAppController.createBankAccount';


export default class CreditCardForm extends LightningElement {
    @track creditCardNo = '';
    @track name = '';
    @track age = 0;
    @track amount =0;

    handleInputChange(event) {
        const field = event.target.dataset.id;
        switch (field) {
            case 'creditCardNo':
                this.creditCardNo = event.target.value;
                break;
            case 'name':
                this.name = event.target.value;
                break;
            case 'age':
                this.age = parseInt(event.target.value, 10);
                break;
            case 'amount':
            this.amount = parseInt(event.target.value, 10);
                break;
            default:
                break;
        }
    }

    handleSubmit() {
        createBankAccount({ name: this.name, amount: this.amount, creditCardNo: this.creditCardNo,age: this.age })
            .then(() => {
                // Handle success
                console.log('Bank account created successfully.');
                // Optionally, reset the form fields
                this.resetFields();
            })
            .catch(error => {
                // Handle error
                console.error('Error creating bank account:', error);
            });
        // console.log("Name: " + this.name);
        // console.log("Amount: " + this.amount);
        // console.log("Credit Card Number: " + this.creditCardNo);
        // console.log("Age: " + this.age);
    }

    resetFields() {
        this.name = '';
        this.amount = '';
        this.creditCardNumber = '';
    }
}
