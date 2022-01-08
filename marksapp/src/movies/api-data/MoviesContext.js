import React from "react";

const SERVER_URL = "http://movie-challenge-api-xpand.azurewebsites.net"

/**Creates the context of the list*/
export let MoviesContext = React.createContext(undefined, undefined);


export function  getLocalStorageMovies (){
    return JSON.parse(localStorage.getItem("movieList") );

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

export async function getMovieByID (id){
    if(id!==undefined) {

        console.log("Retrieving movie data " + id + "...")
        await fetch(SERVER_URL + '/api/movies/' + id, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response =>
            response.json()
        ).then(json => {
                localStorage.setItem("movieData" + id, JSON.stringify(json))
                console.log("Data retrieved", json);
            }
        )
    }
}

export function MoviesInfo(props){

    return(
        <MoviesContext.Provider
            value={{setLocalStorageMovies, getLocalStorageMovies}}> {props.children}
        </MoviesContext.Provider>
    )
}