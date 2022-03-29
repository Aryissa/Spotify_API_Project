import useSpotifyApi from "../spotify.js";

Vue.component('stylee',{
    template:`  <div id="stylee">
                    <div class="row">
                        <div class="col s12">
                            <div class="row">
                                <div class="input-field col s12">
                                    <input type="text" id="autocomplete-input" class="autocomplete">
                                    <label for="autocomplete-input">Catégories de Musique</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
    data: function(){
        return{
            
        }
    },
    methods: {
        choiceStyle: async function(){
            let playlist= await useSpotifyApi.search(this.style);
            this.$emit('an-style',playlist)
        }
    },

    async mounted() {

        
        var elems = document.getElementById('stylee').querySelector('.autocomplete');

        const donnee = {};
        const genres = (await useSpotifyApi.getGenres()).map(element => { donnee[element.name] = null });

        var options = {
            data: donnee
        }

        var instances = M.Autocomplete.init(elems, options);
    } 

})