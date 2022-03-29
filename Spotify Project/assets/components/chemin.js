import useMapApi from "../map.js";
import {villesAPI} from "../villes.mjs";

Vue.component('chemin',{
    template: ` <div id="depart"> 
                    <div class="row">
                        <div class="col s12">
                            <div class="row">
                                <div class="input-field col s12">
                                    <input v-model="depart" @keyup="findDepart()" type="text" id="autocomplete-input" class="autocomplete">
                                    <label for="autocomplete-input">Départ</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row" id="arriver">
                        <div class="col s12">
                            <div class="row">
                                <div class="input-field col s12">
                                    <input v-model="arriver" @keyup="findArriver()" type="text" id="autocomplete-input" class="autocomplete">
                                    <label for="autocomplete-input">Arrivé</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
    data: function(){
        return{
            departInput: null,
            arriverInput: null,
            depart : "",
            arriver : "",
        }
    },
    methods:{

        findDepart : async function() {

            if(this.depart.length > 1) {
                try {
                    let donnee = await villesAPI.getVille(this.depart);
                    let data = {};

                    donnee.forEach(element => {data[element.properties.postcode + " " + element.properties.label] = null});

                    this.departInput.updateData(data);

                    

                } catch(e) {
                    console.log("ville non trouvé");
                }
            }
            
        },

        findArriver : async function() {

            if(this.arriver.length > 1) {
                try {
                    let donnee = await villesAPI.getVille(this.arriver);
                    let data = {};

                    donnee.forEach(element => {data[element.properties.postcode + " " + element.properties.label] = null});

                    this.arriverInput.updateData(data);

                    

                } catch(e) {
                    console.log("ville non trouvé");
                }
            }
            
        },

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
        },
    },

    async mounted() {

        let departInput = document.getElementById('depart').querySelector('.autocomplete');
        let arriverInput = document.getElementById('arriver').querySelector('.autocomplete');

        const options ={
            minLength : 2,
            data : {},
            sortFunction : (a,b) => a.localeCompare(b)
        }

        let instanceDepart = M.Autocomplete.init(departInput, options);
        let instanceArriver = M.Autocomplete.init(arriverInput, options);

        this.departInput = instanceDepart;
        this.arriverInput = instanceArriver;

    } 

    
})