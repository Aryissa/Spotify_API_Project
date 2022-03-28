const useMapApi={

    getCoord: (ville)=>new Promise((resolve,reject)=>{
        const BaseUrlCoord=`https://geocodage.ign.fr/look4/poi/search?q=${ville}`
        fetch(BaseUrlCoord).
        then((response)=>{
            let res=response.json();
            resolve(res)
        }).
        catch(error=>reject(error))
    }),

    getTime: (lat1,long1,lat2,long2)=>new Promise((resolve, reject)=>{
        const BaseUrlIiti=`https://wxs.ign.fr/calcul/geoportail/itineraire/rest/1.0.0/route?resource=bdtopo-pgr&start=${long1},${lat1}&end=${long2},${lat2}`
        fetch(BaseUrlIiti).
        then((response)=>{
            let res=response.json();
            resolve(res)
        }).
        catch(error=>reject(error))
    })
}

export default useMapApi