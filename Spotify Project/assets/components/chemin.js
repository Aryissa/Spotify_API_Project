import useMapApi from "../map.js"

Vue.component('chemin',{
    template: ` <div>
                    <label for="depart">Départ: </label>
                    <input type="text" id="depart" name="depart" placeholder="ex: Nantes" v-model="depart"/>
                    <br/>
                    <label for="arrivee">Arrivée: </label>
                    <input type="text" name="arrivee" id="arrivee" placeholder="ex :Toulon" v-model="arriver"/>
                </div>`,
    data: function(){
        return{
            depart : "",
            arriver : "",
        }
    },
    methods:{
        getItineraire: async function(){
            let coordDep= await useMapApi.getCoord(this.arriver);
            let coordArr =await useMapApi.getCoord(this.depart);

            let itineraire= await useMapApi.getTime(coordDep, coordArr);
            this.$emit('an-event',itineraire)
            //PROBLEME ON A PAS DE SUBMIT SUR CA
        }
    }
})