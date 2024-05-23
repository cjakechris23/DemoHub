// force-app/main/default/lwc/bankingApp/bankingApp.js
import { LightningElement, wire, api, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getAccountById from '@salesforce/apex/BankController.getAccountById';
import deposit from '@salesforce/apex/BankController.deposit';
import withdraw from '@salesforce/apex/BankController.withdraw';

export default class bankSystem extends LightningElement {
    @api recordId;
    @track account;
    @track error;
    amount;

    @wire(getAccountById, { accountId: '$recordId' })
    wiredAccount({ error, data }) {
        if (data) {
            this.account = data;
        } else {
            this.error = error;
        }
    }

    handleAmountChange(event) {
        this.amount = event.target.value;
    }
    
    handleDeposit() {
        deposit({ accountId: this.recordId, amount: this.amount })
            .then(result => {
                this.account = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.account = undefined;
            });
    }

    handleWithdraw() {
        if(this.amount > this.account.Amount__c) {
            this.error = 'Insufficient funds';
        } else 
        withdraw({ accountId: this.recordId, amount: this.amount })
            .then(result => {
                this.account = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.account = undefined;
            });
        }

}