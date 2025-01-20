
export const fetchFromTMDB = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',apiEndpoint:string = '', fullApiUrl?:string) => {
    let url = `https://api.themoviedb.org/3/account/20974213/${apiEndpoint}`;
    const options = {
        method: method,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
        }
    };
    if(fullApiUrl) {
        url = fullApiUrl;
    }
   const jsonResponse =  await fetch(url, options).catch((err) => {throw new Error(err)});
    return  await jsonResponse.json();
}