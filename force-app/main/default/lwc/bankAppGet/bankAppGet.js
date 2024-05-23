import { LightningElement, wire, track } from 'lwc';
import getBankAccounts from '@salesforce/apex/BankingAppController.getBankAccounts';
import LightningAlert from 'lightning/alert';

export default class BankAppGet extends LightningElement {
    @track account;

    @wire(getBankAccounts)
    wiredAccount({ error, data }) {
        if (data) {
            this.account = data;
            } else if (error) {
                console.error('Error:', error);
            }
    }
    viewBankAccount = false;
    handleAddBankAccount(){
        this.viewBankAccount = true;
        this.editBankAccount = false;
    }

    editBankAccount = false;
    handleEditBankAccount(){
        this.editBankAccount = true;
        this.viewBankAccount = false;
    }

    async updateSuccessAlert(){
        await LightningAlert.open({
            message: 'Successfully Updated the Bank Details',
            theme: 'success', // a red theme intended for error states
            label: 'Update Details', // this is the header text
        });
        this.editBankAccount = false;
        this.viewBankAccount = false;
    }
    @track hoverMouseOver = false;
    handleMouseOver() {
        this.hoverMouseOver = true;
    }
    handleMouseOut(){
        this.hoverMouseOver = false;
    }

}

