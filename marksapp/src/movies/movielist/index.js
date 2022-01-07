import React from "react";
import {MovieItem} from "../movieitem";
import {getLocalStorageMovies, setLocalStorageMovies} from "../api-data/MoviesContext";
import "./index.css"
import {MovieModal} from "../movieModal";


export function MovieList(){

    const [movieList, setMovieList] = React.useState()
    const [list, setList] = React.useState(
        { items: 10,
        data: []
        }
    );
    React.useEffect(  ()=> {async function A(){
        let localData = getLocalStorageMovies();

        if(localData!==null){
            setMovieList(getLocalStorageMovies())
            setList({
                items: 10,
                data: localData.content.slice(0, 10)
            })
        }else{
            await setLocalStorageMovies().then(()=>{
                setMovieList(getLocalStorageMovies())
            }).then(()=>{
                setList({
                    items: 10,
                    data: getLocalStorageMovies().content.slice(0, 10)
                })})
        }

        } A().then(()=>{}); }, []);

    let dataTable = React.createRef();

    let onScroll = () => {
        let table = dataTable.current;
        setTimeout(()=> {
            if (table.scrollTop === (table.scrollHeight - table.offsetHeight)) {
                if (movieList.content.length>=list.items + 10 ) {
                    setList({
                        items: list.items + 10,
                        data: movieList.content.slice(0, list.items + 10),
                    });
                }
            }
        },1000)
    };

    /**Modal Handling*/
    const [selectedMovie, setSelectedMovie] = React.useState();
    const [toggle, setToggle] = React.useState(false);
    async function handleClick(id){
        setSelectedMovie(id)
        setToggle(!toggle);
    }

    return(
        <>  <p className="tableCaption">Movie Ranking</p>
            <MovieModal movie={selectedMovie} toggle={toggle} >{}</MovieModal>
            <div className="movietableDiv" onScroll={onScroll}>
            <table className="movietable" ref={dataTable} >
            <thead className="tableHead">
            <tr className="tableHeadRow">
                <th className="tableHeader">Ranking</th>
                <th className="headerTitle">Title</th>
                <th className="headerYear">Year</th>
                <th className="headerRev">Revenue</th>
                <th className="tableIcon"><br>{ }</br></th>
            </tr>
            </thead>
                <tbody className="tableBody"   >
            {

                list.data.map(
                    (item, index) => (
                        <MovieItem onClick={()=>handleClick(item.id)}
                            key={item.id}
                            index={index}
                            movie={item}
                        />
                    ))
            }
            </tbody>
        </table>
            </div>

        </>
    )
}