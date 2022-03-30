import useSpotifyApi from "../spotify.js";

Vue.component('playlists',{
    props: ['imgSrcp','titlep'],
    template: ` <div class="container">
                <div class="row">    
                    <div class="col">
                            <img class="img-fluid card-img-top" v-bind:src=imgSrcp>
                            <br/>
                            <p class="card-title center" style="color: black !important"> {{titlep}} </p>
                        </div>
                    </div>    
                </div>`,

    data: function(){
        return{
            
        }
    },
    methods:{
       
    }
})