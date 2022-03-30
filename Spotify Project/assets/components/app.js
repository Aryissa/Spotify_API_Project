import useSpotifyApi from "../spotify.js";
import useMapApi from "../map.js";

Vue.component('app', {
    name: 'app',
    template: ` <div>
                    <div class="row align-items-start"></div>
                        <div id="interaction" class="row align-items-center">
                            <div id="renseignement" class="col"  >
                                <chemin @depart="setDepart($event)"  @arriver="setArriver($event)">    </chemin>
                                <br/>
                                <stylee @an-style="setId($event)">     </stylee>
                                <br/>
                                <label for="style">Nom de la playlist</label>
                                <input type="text" name="nom" id="nom" placeholder="ex: Voyage plage" v-model="namePlaylist"/>
                                <div class="row">
                                    <input type="submit" value="Création" id="validation" class="btn btn-secondary btn-lg" @click="creation()">
                                </div>
                            </div>
                            <div class="col">
                                <playlists :imgSrcp=imgSrc   :titlep=title></playlists>
                            </div>
                        </div>
                    </div>
                </div>`,
    data: function(){
        return{
            dureeItineraire:0,
            styleMusic:"",
            namePlaylist:"",
            depart : "",
            arriver : "",
            genre : "",
            imgSrc: "",
            title: ""
        }
    },
    methods:{

        // on récupère la ville de départ depuis notre composant chemin
        setDepart : function(depart) {
            this.depart = depart;
            
        },

        // on récupère la ville d'arrivée depuis notre composant chemin
        setArriver : function(arriver) {
            this.arriver = arriver;
        },
        
        setId: async function(idplaylist){
            this.styleMusic=idplaylist.playlists.items[0].id
            console.log(this.styleMusic);
        },

        creation: async function(){

            if(this.depart != "" && this.arriver != "" && this.styleMusic != "" && this.namePlaylist != "") {
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

                console.log(temp.duration);

                //créer la playlist
                let newPlaylist=await useSpotifyApi.createPlaylist(this.namePlaylist);
                //console.log("Bonhour",newPlaylist);
                //récupérer la playlist
                let data = await useSpotifyApi.getPlaylist(this.styleMusic);
                //récupérer les sons de la playlist
                let songs=data.tracks.items;
                let timeNewPlaylist=0;

                let idNewPlaylist=newPlaylist.id

                for(const son of songs) {
                    if(timeNewPlaylist<temp.duration){
                        timeNewPlaylist += (son.track.duration_ms/60000);
                        let result = await useSpotifyApi.addMusic("spotify:track:"+son.track.id,newPlaylist.id);
                        console.log(result);
                    }
                }
                let getplaylist=await useSpotifyApi.getPlaylist(idNewPlaylist)
                console.log(getplaylist);
                this.imgSrc=getplaylist.images[0].url
                this.title=getplaylist.name

            } 

            
        }
    }

})
