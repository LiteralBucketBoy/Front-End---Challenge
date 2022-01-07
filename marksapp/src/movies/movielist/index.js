import React from "react";
import {MovieItem} from "../movieitem";
import {getLocalStorageMovies} from "../api-data/MoviesContext";
import "./index.css"

export function MovieList(){
    let movielist = getLocalStorageMovies();


    let dataTable = React.createRef();

    const [list, setList] = React.useState({
        itemsDisplayed: 10,
        data: movielist.content.slice(0,  100),
    });


    let onScroll = () => {
        let tableEl = dataTable.current;
        if (tableEl.scrollTop === (tableEl.scrollHeight - tableEl.offsetHeight)) {
            if (list.itemsDisplayed + 10 <= movielist.content.length) {
                setList({
                    itemsDisplayed: list.itemsDisplayed + 10,
                    data: movielist.content.slice(0, list.itemsDisplayed + 10),
                });
            }
        }
    };

    return(
        <>
            <table className="movietable" ref={dataTable} onScroll={onScroll}>
            <caption className="tableCaption">Movie Ranking</caption>
            <thead className="tableHead">
            <tr>
                <th className="tableHeader">Ranking</th>
                <th className="tableHeader">Title</th>
                <th className="tableHeader">Year</th>
                <th className="tableHeader">Revenue</th>
                <th className="tableHeader">{}</th>
            </tr>
            </thead>
                <tbody  >
            {

                list.data.map(
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