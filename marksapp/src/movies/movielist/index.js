import React from "react";
import "./index.css"
import {MovieItem} from "../movieitem";
import {getLocalStorageMovies} from "../api-data/MoviesContext";


export function MovieList(){
    let list = getLocalStorageMovies();
    console.log(list.content)
    if(list.content)
    return(
        <><table>
            <caption>Movie Ranking</caption>
            <thead>
            <tr >
                <th>Ranking</th>
                <th>Title</th>
                <th>Year</th>
                <th>Revenue</th>
                <th>{}</th>
            </tr>
            </thead>
            <tbody className="list-body">
            {

                list.content.map(
                    (item, index) => (
                        <MovieItem
                            key={item.id}
                            index={index}
                            movie={item}
                        />
                    ))
            }
            </tbody>

        </table>
        </>
    )
}