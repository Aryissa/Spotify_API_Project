import useSpotifyApi from "../spotify.js";

Vue.component('stylee',{
    template:`  <div>
                    <label for="stylee">Style de musique: </label>
                    <input type="text" name="stylee" id="stylee" placeholder="ex :Métal" v-model="style"/>
                    <br/>
                    <input type="submit" value="get id" @click="choiceStyle()">
                </div>`,
    data: function(){
        return{
            style:"",
        }
    },
    methods: {
        choiceStyle: async function(){
            let playlist= await useSpotifyApi.search(this.style);
            this.$emit('an-style',playlist)
        }
    }

})