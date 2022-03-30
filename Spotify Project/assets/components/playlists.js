import useSpotifyApi from "../spotify.js";

Vue.component('playlists',{
    props: ['imgSrcp','titlep'],
    template: ` <div class="container">    
                    <div class="col">
                        <img class="img-fluid" v-bind:src=imgSrcp >
                        <br/>
                        <p class="center"><strong> {{titlep}} </strong></p>
                    </div>
                </div>`,

    data: function(){
        return{
            
        }
    },
    methods:{
       
    }
})