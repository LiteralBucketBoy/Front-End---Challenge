import React from "react";
import lastTrIcon from "./Path 11162.svg"


export function MovieItem({movie}) {
    return (
        <tr className="movie-item" >
            <td className="item-rank">
               {movie.rank}
            </td>
            <td className="item-title">
                {movie.title}
            </td>
            <td className="item-year">
                {movie.year}
            </td>
            <td className="item-revenue">
                {movie.revenue ? "$" + movie.revenue + "million": "" }
            </td>
            <td className="item-icon">
                <img src={lastTrIcon} alt={"eye icon"}/>
            </td>
        </tr>

    );
}