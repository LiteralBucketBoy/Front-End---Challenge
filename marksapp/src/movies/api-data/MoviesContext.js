import React from "react";

const SERVER_URL = "http://movie-challenge-api-xpand.azurewebsites.net"

let testState = []

/**Creates the context of the list*/
export let MoviesContext = React.createContext(undefined, undefined);


export function  getLocalStorageMovies (){
    let movieListInfo = JSON.parse(localStorage.getItem("movieList") ); /**reconverts the list back to the object*/
    return movieListInfo!==null ? movieListInfo : testState;
}

export async function setLocalStorageMovies() {
    console.log("Retrieving all movies...")
    await fetch(SERVER_URL+'/api/movies/', {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response =>
        response.json()
    ).then(json =>
    {
        localStorage.setItem("movieList", JSON.stringify(json))
        console.log("Data retrieved");
    }
    )
}

export function MoviesInfo(props){
    React.useEffect(() => {
        let localData = getLocalStorageMovies();
        if(localData===testState){
            setLocalStorageMovies().then()
        }
    }, [])
    return(
        <MoviesContext.Provider
            value={{setLocalStorageMovies, getLocalStorageMovies}}> {props.children}
        </MoviesContext.Provider>
    )
}