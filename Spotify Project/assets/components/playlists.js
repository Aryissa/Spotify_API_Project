import useSpotifyApi from "../spotify.js";

Vue.component('playlists',{
    props: ['imgSrcp','titlep'],
    template: ` <div>
                    <div class="row px-sm-2 px-0 pt-3">
                        <div class="col-md-4 offset-md-0 offset-sm-2 offset-1 col-sm-8 col-10 offset-sm-2 offset-1 mb-3"   >
                            <div class="card">
                                <img width="270" height="160" class="img-fluid" v-bind:src=imgSrcp>
                                <br/>
                                <p class="center"><strong> {{titlep}} </strong></p>
                            </div>    
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