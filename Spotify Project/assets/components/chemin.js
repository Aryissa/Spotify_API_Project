import useMapApi from "../map.js"

Vue.component('chemin',{
    template: ` <div>
                    <div class="row" id="depart">
                        <div class="col s12">
                            <div class="row">
                                <div class="input-field col s12">
                                    <input v-model="depart" @keyup="findVille()" type="text" id="autocomplete-input" class="autocomplete">
                                    <label for="autocomplete-input">Départ</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row" id="arriver">
                        <div class="col s12">
                            <div class="row">
                                <div class="input-field col s12">
                                    <input v-model="arriver" @keyup="findVille()" type="text" id="autocomplete-input" class="autocomplete">
                                    <label for="autocomplete-input">Arrivé</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
    data: function(){
        return{
            message: "",
            depart : "",
            arriver : "",
        }
    },
    methods:{

        findVille : async function() {
            
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

    } 

    
})