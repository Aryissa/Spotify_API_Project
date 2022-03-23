import useSpotifyApi from "../spotify.js";

Vue.component('app', {
    name: 'app',
    template: ` <div id="interaction">
                    <div id="renseignement">
                        <chemin>    </chemin>
                        <br/>
                        <stylee>     </stylee>
                        <br/>
                        <label for="style">Nom de la playlist</label>
                        <input type="text" name="nom" id="nom" placeholder="ex: Voyage plage"/>
                    </div>
                    <div id="ok">
                        <input type="submit" value="Création" id="validation">
                    </div>
                </div>`,
    data: function(){
        return{

        }
    },
    methods:{

    }

})