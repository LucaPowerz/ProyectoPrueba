
export default class Champion {
   
    constructor(data) {
        console.log(data)
        this.name = data.name;
        this.full = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+data.id+"_0.jpg";
        this.title = data.title;
        this.desc = data.blurb;
        this.id = data.id;
    }
}