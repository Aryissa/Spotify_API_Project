import useSpotifyApi from "../spotify.js";

Vue.component('appplay',{
    template:`  <div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div v-for="playlist in listPlaylist"  v-if="playlist.images[0] != undefined" class="col-5">            
                                <playlists class="card text-white bg-secondary mb-3" :imgSrcp=playlist.images[0].url   :titlep=playlist.name :url=playlist.id ></playlists>
                            </div>
                        </div>
                    </div>
                </div>`,
    data: function(){
        return{
            listPlaylist:[],
        }
    },
    methods: {
        
    },
    async mounted() {
        let list=await useSpotifyApi.getPlaylistsUser();
        this.listPlaylist=list.items
    }
})