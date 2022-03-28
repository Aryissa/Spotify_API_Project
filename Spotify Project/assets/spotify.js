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
            body: "grant_type=refresh_token&refresh_token=BQACDdi71-8GYP_qW4mSTb8-yeU0ikdNBcZ5tHy3pNAE8BtHb313jln9U-VmzygkVH_XnV-QvLnVdEx0T_PTgxCh26HW-BbBJkbFJ3T_yaUr1KoT473l7B8dSCtznsW70zx4xm8ShAg05MMI5MZhM9u2s2SLe1TsCXW7ugvLBi7rG47PB1FYg0zz-vcGD4wj--c"
        }).then(response => response.json())
        .then(data=> resolve(data.access_token))
    }),

    createPlaylist: ()=> new Promise((resolve, reject)=>{
        //Create our new playlist
        let baseUrlNewPlaylist= `https://api.spotify.com/v1/users/${clientId}/playlists`
        fetch(baseUrlNewPlaylist,useSpotifyApi.getToken())
        .then((response)=>{
            let res=response.json();
            resolve(res)
        })
        .catch(error=>reject(error))
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
        let baseUrlPlaylist=`https://api.spotify.com/v1/playlists/${idplaylist}`
        fetch(baseUrlPlaylist,useSpotifyApi.getToken())
        .then((response)=>{
            let res=response.json();
            resolve(res)
        })
        .catch(error=>reject(error))
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