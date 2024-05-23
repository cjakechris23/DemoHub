import { LightningElement,api } from 'lwc';

export default class ChildComponent extends LightningElement {
    firstName='';
    lastName='';
    @api getValueFromParent;
    

    handleChangeFirstName(event){
        this.firstName = event.target.value;
    }
    handleChangeLastName(event){
        this.lastName = event.target.value;
    }
    handleClick(event){
        const searchEvent = new CustomEvent('getsearchevent',
        {detail: {
            firstName: this.firstName,
            lastName: this.lastName
        }});
        this.dispatchEvent(searchEvent);
    } 
    handleClickParent(){
       console.log(JSON.stringify(this.getValueFromParent.firstName));
    }
}

