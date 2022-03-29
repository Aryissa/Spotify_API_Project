import useSpotifyApi from "../spotify.js";

Vue.component('appplay',{
    template:`  <div>
                    <input type="submit"  @click="getlist()">
                    
                    <playlists   v-for= "playlist in listPlaylist"       :imgSrcp=playlist.images[0].url   :titlep=playlist.name></playlists>
                </div>`,
    data: function(){
        return{
            listPlaylist:[],
        }
    },
    methods: {
        getlist: async function(){
            let list=await useSpotifyApi.getPlaylistsUser();
            this.listPlaylist=list.items
            console.log(list.items);
        }
    }
})