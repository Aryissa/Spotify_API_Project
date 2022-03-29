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

        creation: async function(){
            //créer la playlist
            let newPlaylist=await useSpotifyApi.createPlaylist(this.namePlaylist)
            //récupérer la playlist
            let data = await useSpotifyApi.getPlaylist(this.styleMusic);
            let newPlaylistId=newPlaylist.id
            //récupérer les sons de la playlist
            let songs=data.tracks.items
            let timeNewPlaylist=0;
            let nbSong=0;
            songs.forEach(element => {
                //element est le track courrant
                if(timeNewPlaylist<this.dureeItineraire){
                    timeNewPlaylist=timeNewPlaylist+(element.track.duration_ms/60000)
                    //console.log(timeNewPlaylist);
                    useSpotifyApi.addMusic("spotify:track:"+element.track.id,newPlaylistId)
                }
            });
        }
    }

})