import { LightningElement,track,api,wire } from 'lwc';
import getBankAccounts from '@salesforce/apex/BankingAppController.getBankAccounts'
export default class ParentComponent extends LightningElement {
    Name = '';
    Amount = '';
    CreditCardNo = '';
    @track recordId;
    @track account = [];

    handleEvent(event){
        this.Name = event.detail.Name;
    }

    @wire(getBankAccounts)

    wiredAccount({error,data}){
            if(data){
                this.account = data;
                console.log(JSON.stringify(data));
                this.recordId = data.Id
            }
            else if(error){
                console.log('Error: ' , error);
            }
        }
    
}