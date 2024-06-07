import { LightningElement,api,track } from 'lwc';

export default class ChildComponent extends LightningElement {
    Name='';

    @api getValueFromParent;
    @api recordId

    handleChangeName(event){
        this.Name = event.target.value;
    }
    handleClick(event){
        const searchEvent = new CustomEvent('getsearchevent',
        {detail: {
            Name: this.Name
        }});
        this.dispatchEvent(searchEvent);
    } 
    
}