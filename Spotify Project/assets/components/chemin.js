import useMapApi from "../map.js"

Vue.component('chemin',{
    template: ` <div>
                    <label for="depart">Départ: </label>
                    <input type="text" id="depart" name="depart" placeholder="ex: Nantes" v-model="depart"/>
                    <br/>
                    <label for="arrivee">Arrivée: </label>
                    <input type="text" name="arrivee" id="arrivee" placeholder="ex :Toulon" v-model="arriver"/>
                    <br/>
                    <input type="submit" value="Création itinéraire" @click="getItineraire()">
                </div>`,
    data: function(){
        return{
            depart : "",
            arriver : "",
        }
    },
    methods:{
        getItineraire: async function(){
            
            //DEPART
            let coordDepart= await useMapApi.getCoord(this.depart);

            let longDepar= coordDepart.features[0].geometry.coordinates[0] 
            let latDepar= coordDepart.features[0].geometry.coordinates[1]
            

            //ARRIVER
            let coordArrive= await useMapApi.getCoord(this.arriver);

            let longArrive= coordArrive.features[0].geometry.coordinates[0]
            let latArrive= coordArrive.features[0].geometry.coordinates[1]
            

            //ITINERAIRE
            let temp= await useMapApi.getTime(latDepar,longDepar,latArrive,longArrive);

            //Transmettre a app
            this.$emit('an-time',temp.duration)
        }
    }
})