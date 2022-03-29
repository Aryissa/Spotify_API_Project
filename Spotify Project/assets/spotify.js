const clientId = "d94211b651c14679880501ef0170f06d";
const clientSecret = "a42ff74d0102402498f1cd58db392cdd";


const useSpotifyApi={

    getToken: () => new Promise((resolve,reject) =>{
        const URL = 'https://accounts.spotify.com/api/token'
        let Authorization = btoa(clientId + ':' + clientSecret)
    
        fetch(URL,{
            method:"POST",
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Authorization}`,
            },
            body:"grant_type=refresh_token&refresh_token=AQALdt-VJManO_593Ncqf-zKPOa-nI6e-mudeG_C8PYf4qhxHZNiyU1C1dq9O8sFrKNicvmFHC7ei7M8mYuDvPWrvcdysQ4u5SVgjEmbEUTpcd2t-ySnwDymAfuTXxvxofw"
        }).then(response => response.json())
        .then(data=> resolve(data.access_token))
    }),

    createPlaylist: (name)=> new Promise((resolve, reject)=>{
        //Create our new playlist
            useSpotifyApi.getToken().then(token =>{
                const baseUrlNewPlaylist= `https://api.spotify.com/v1/users/xh146n6b6b4qpji3a2w4nbl0m/playlists`
                fetch(baseUrlNewPlaylist,{
                    method:"POST",
                    headers : { 'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "name": name,
                        "description": "New playlist description",
                        "public": false
                    })
                })
                .then((response) => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
                })

    }),

    search: (categorie)=> new Promise((resolve, reject)=>{
        //search the playlist by categorie
        useSpotifyApi.getToken().then(token =>{
            let baseUrlSearch= `https://api.spotify.com/v1/search?q=playlist%3A${categorie}&type=playlist`
            fetch(baseUrlSearch,{
                headers : { 'Authorization':`Bearer ${token}`}
            })
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        })
    }),

    getPlaylist: (idplaylist)=>new Promise((resolve,reject)=>{
        //get the Playlist for get song and analyse time
        useSpotifyApi.getToken().then(token =>{
            let baseUrlPlaylist=`https://api.spotify.com/v1/playlists/${idplaylist}`
            fetch(baseUrlPlaylist,{
                headers : { 'Authorization':`Bearer ${token}`}
            })
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        })
    }),

    getTrackTime: (id)=> new Promise((resolve,reject)=>{
        // get the time of the track 
        let baseUrlGetTime=`https://api.spotify.com/v1/audio-analysis/${id}`
        fetch(baseUrlGetTime,useSpotifyApi.getToken())
        .then((response)=>{
            let res=response.json();
            resolve(res)
        })
        .catch(error=>reject(error))
    }),

    addMusic: (idTrack,idplaylist)=> new Promise((resolve,reject)=>{
        let baseUrlAddMusic=`https://api.spotify.com/v1/playlists/${idplaylist}/tracks?uris=${idTrack}`
        fetch(baseUrlAddMusic,useSpotifyApi.getToken())
        .then((response)=>{
            let res=response.json();
            resolve(res)
        })
        .catch(error=>reject(error))
    })
}

export default useSpotifyApi