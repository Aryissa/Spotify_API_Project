import useSpotifyApi from "../spotify.js";
import useMapApi from "../map.js";

Vue.component('app', {
    name: 'app',
    template: ` <div>
                    <div class="row align-items-start"></div>
                    <div id="interaction" class="row align-items-center">
                        <div class="col">
                        </div>
                        <div id="renseignement" class="col"  >
                            <chemin @depart="setDepart($event)"  @arriver="setArriver($event)">    </chemin>
                            <br/>
                            <stylee @an-style="setId($event)">     </stylee>
                            <br/>
                            <label for="style">Nom de la playlist</label>
                            <input type="text" name="nom" id="nom" placeholder="ex: Voyage plage" v-model="namePlaylist"/>
                        </div>
                        <div id="ok" class="col">
                            <input type="submit" value="Création" id="validation" class="btn btn-secondary btn-lg" @click="creation()">
                        </div>
                        <div class="row">
                            <playlists :imgSrcp=imgSrc   :titlep=title></playlists>
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

        setDepart : function(depart) {
            this.depart = depart;
            
        },

        setArriver : function(arriver) {
            this.arriver = arriver;
        },

        setTime: function(time){
            this.dureeItineraire=time
            console.log(this.dureeItineraire);
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

                songs.forEach(element => {
                    //element est le track courrant
                    if(timeNewPlaylist<temp.duration){
                        timeNewPlaylist += (element.track.duration_ms/60000);
                        console.log(timeNewPlaylist);
                        //console.log(timeNewPlaylist);
                        useSpotifyApi.addMusic("spotify:track:"+element.track.id,newPlaylist.id);
                    }
                });
                let getplaylist=await useSpotifyApi.getPlaylist(idNewPlaylist)
                console.log(getplaylist);
                this.imgSrc=getplaylist.images[0].url
                this.title=getplaylist.name

            } 

            
        }
    }

})