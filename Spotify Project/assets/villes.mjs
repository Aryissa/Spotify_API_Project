const urlBaseGouv = 'https://api-adresse.data.gouv.fr/search/';
const facetsGouv= 'type=municipality&autocomplete=0';

const villesAPI = {

    getVille : async (nom) => {
        const urlGouv =  `${urlBaseGouv}?q=${nom}&${facetsGouv}`;
        const result = await fetch(urlGouv);
        const data = await result.json();
        return data.features;
    } 

    // getVille(nom){
    //     return new Promise((resolve, reject) => {

    //         const urlGouv =  `${urlBaseGouv}?q=${nom}&${facetsGouv}`;
    //         const result = fetch(urlGouv);

    //         const urlGouv =  `${urlBaseGouv}?q=${nom}&${facetsGouv}`;
    //         fetch(urlGouv).
    //         then((response) => response.json()).
    //         then(data => {
    //             const villes = data
    //                 .features
    //                 .map(item => item.properties)
    //                 .map(obj => {obj.postcode, obj.label});
    //             resolve(villes);
    //         }).
    //         catch(error => reject(error));
    //     })
    // }
}

export {villesAPI};