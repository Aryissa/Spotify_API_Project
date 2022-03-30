import useSpotifyApi from "../spotify.js";

Vue.component('playlists',{
    props: ['imgSrcp','titlep', 'url'],
    template: ` <div class="container">
                    <div class="row">   
                        <div class="col">
                                <img class="img-fluid card-img-top" v-bind:src=imgSrcp>
                        </div>

                        <div class="col">
                        <p>{{titlep}}</p>
                        <iframe v-bind:src=test width="100%" height="80%" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        </div>
                    </div>    
                    
                </div>`,

    data: function(){
        return{
            test:"https://open.spotify.com/embed/playlist/"+this.url+"?utm_source=generator"
        }
    },
    methods:{
       
    },
})