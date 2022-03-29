import useSpotifyApi from "../spotify.js";

Vue.component('app', {
    name: 'app',
    template: ` <div id="interaction" class="row align-items-start">
                    <div class="col">
                    </div>
                    <div id="renseignement" class="col"  >
                        <chemin @an-time="setTime($event)">    </chemin>
                        <br/>
                        <stylee @an-style="setId($event)">     </stylee>
                        <br/>
                        <label for="style">Nom de la playlist</label>
                        <input type="text" name="nom" id="nom" placeholder="ex: Voyage plage" v-model="namePlaylist"/>
                    </div>
                    <div id="ok" class="col">
                        <input type="submit" value="Création" id="validation" class="btn btn-secondary btn-lg" @click="creation()">
                    </div>
                    <p> duree de la playlist: {{dureeItineraire}} </p>
                    <p> le style de la playlist: {{styleMusic}} </p>
                </div>`,
    data: function(){
        return{
            dureeItineraire:0,
            styleMusic:"",
            namePlaylist:"",
        }
    },
    methods:{
        setTime: function(time){
            this.dureeItineraire=time
            console.log(this.dureeItineraire);
        },
        
        setId: function(idplaylist){
            this.styleMusic=idplaylist.playlists.items[0].id
            console.log(this.styleMusic);
        },

        creation: function(){
            //créer la playlist
            useSpotifyApi.createPlaylist(this.namePlaylist)
            //récupérer la playlist
            
            //récupérer les sons de la playlist
            
            //vérifier temps des sons

            //ajouter sons

        }
    }

})