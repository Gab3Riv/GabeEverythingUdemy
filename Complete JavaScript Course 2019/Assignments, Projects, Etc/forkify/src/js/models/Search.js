import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }
    async getResults(){
        const key = '5349f50ee29fcdd1599aa92cb760040a';
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            console.log(res);
            console.log(this.query);
            console.log(this.result);
        }catch(error){
            alert(error);
        }
        
    }
}

