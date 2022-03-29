import useMapApi from "../map.js";
import {villesAPI} from "../villes.mjs";

Vue.component('chemin',{
    template: ` <div id="depart"> 
                    <div class="row">
                        <div class="col s12">
                            <div class="row">
                                <div class="input-field col s12">
                                    <input v-model="depart" v-on:change="sendDepart()" @keyup="autoDepart" type="text" id="autocomplete-input" class="autocomplete">
                                    <label for="autocomplete-input">Départ</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row" id="arriver">
                        <div class="col s12">
                            <div class="row">
                                <div class="input-field col s12">
                                    <input v-model="arriver" v-on:change="sendArriver()" @keyup="autoArriver" type="text" id="autocomplete-input" class="autocomplete">
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

        autoDepart : async function() {

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

        sendDepart : async function() {
            this.$emit('depart', this.depart);
        },

        autoArriver : async function() {

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

        sendArriver : async function() {
            this.$emit('arriver', this.arriver);
        }
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