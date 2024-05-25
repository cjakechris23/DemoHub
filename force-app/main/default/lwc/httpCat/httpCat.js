import { LightningElement, track } from 'lwc';

const Trivia = "https://official-joke-api.appspot.com/jokes/random";
const HTTPCat = 'https://http.cat/200.jpg';
export default class HttpCat extends LightningElement {
    @track activity;
    planetName;
    Info = {};
    statusCat = {};
    @track imageURL;
    handleChange(event){
        this.planetName = event.target.value;
    }

    getPlanetInfo(){
       // Fetch Jokes
       this.Info ={};
       fetch(Trivia)
       .then(response => {
           if(response.ok){
               return response.json();
           } else {
               throw new Error(response);
           }
       }).then(Info => {
           this.Info = {
               type: Info.type,
               setup: Info.setup,
               punchline: Info.punchline,
               id: Info.id
           };
       }).catch(error => {
           console.error(error);
       });
    }
}

