import { LightningElement, wire, track } from 'lwc';
import searchBankAccountsByName from '@salesforce/apex/BankController.searchBankAccountsByName';
import getAccountById from '@salesforce/apex/BankController.getAccountById';

export default class SearchBankAccounts extends LightningElement {
    @track searchKey = '';
    @track accounts;
    @track selectedAccount;

    handleSearchChange(event) {
        this.searchKey = event.target.value;
        if (this.searchKey.length > 2) { // Trigger search after 2 characters
            searchBankAccountsByName({ searchTerm: this.searchKey })
                .then(result => {
                    this.accounts = result;
                })
                .catch(error => {
                    this.accounts = null;
                    console.error('Error:', error);
                });
        } else {
            this.accounts = null;
        }
    }

    handleSelectAccount(event) {
        const accountId = event.target.dataset.id;
        getAccountById({ accountId })
            .then(result => {
                this.selectedAccount = result;
            })
            .catch(error => {
                this.selectedAccount = null;
                console.error('Error:', error);
            });
    }
}