import { LightningElement,track,api,wire } from 'lwc';
import getBankAccounts from '@salesforce/apex/BankingAppController.getBankAccounts'
export default class ParentComponent extends LightningElement {
    firstName = '';
    lastName = '';
    value = 'from Parent';
    @track account = [];

    handleEvent(event){
        this.firstName = event.detail.firstName;
        this.lastName = event.detail.lastName;
    }

    @wire(getBankAccounts)

    wiredAccount({error,data}){
            if(data){
                this.account = data;
                console.log(JSON.stringify(data));
            }
            else if(error){
                console.log('Error: ' , error);
            }
        }
    
}