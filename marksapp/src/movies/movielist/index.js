import React from "react";
import {MovieItem} from "../movieitem";
import {getLocalStorageMovies, setLocalStorageMovies} from "../api-data/MoviesContext";
import "./index.css"
import {MovieModal} from "../movieModal";
import {FilterModal} from "../filtermodal";
import redo from "./Group 20082.svg"

export function MovieList(){
    const [movieList, setMovieList] = React.useState()
    const [list, setList] = React.useState([]);
    React.useEffect(  ()=> {async function A(){
            let localData = getLocalStorageMovies();
            if(localData!==null){
                setMovieList(getLocalStorageMovies())
                setList( localData.content.slice(0, 10))
            }else{
                await setLocalStorageMovies()
                    .then(()=>{setMovieList(getLocalStorageMovies())})
                    .then(()=>{setList(getLocalStorageMovies().content.slice(0, 10))})
            }
        } A().then(()=>{}); }, []);

    let dataTable = React.createRef();

    const [loading, setLoading] = React.useState(false)
    let onScroll = () => {
        let table = dataTable.current;
            if (table.scrollTop === (table.scrollHeight - table.offsetHeight) && filteredByRev && filteredByYearRev && !loading) {
                setTimeout(()=>{},200);
                setLoading(true);
                if (movieList.content.length>=list.length + 10 ) {
                    setList( movieList.content.sort((a, b) => a.ranking > b.ranking ? 1 : -1).slice(0, list.length + 10),
                    );
                    setTimeout(()=> {setLoading(false)},1000) //this is to give it a cooldown
            }
        }
    };

    /**Movie Modal Handling*/
    const [selectedMovie, setSelectedMovie] = React.useState();
    const [toggle, setToggle] = React.useState(false);
    async function handleClick(id){
        setSelectedMovie(id)
        setToggle(!toggle);
    }
    /**Filter Modal Handling*/
    const [disableBR, setDisableOtherBR] = React.useState(false); //BR - biggest rev
    const [disableYR, setDisableOtherYR] = React.useState(false); //YR - yearly rev
    const [selectedYear, setSelectedYear] = React.useState();
    const [toggleYear, setToggleYear] = React.useState(false);
    const [filteredByYearRev,setFilteredByYearRev] = React.useState(true);
    const [filteredByRev,setFilteredByRev] = React.useState(true);
    const handleYearRevenueClick = (e) =>{
        e.preventDefault();
        setDisableOtherBR(!disableBR)
        setToggleYear(true)
        let localData = getLocalStorageMovies();
        if(filteredByYearRev){

        }else{
            setList(localData.content.sort((a, b) => a.ranking > b.ranking ? 1 : -1).slice(0, 10));
            setToggleYear(false)
            setSelectedYear()
        }
        dataTable.current.scrollIntoView({ behavior: 'smooth' })
        setFilteredByYearRev(!filteredByYearRev);
    }
    const handleBiggestRevenueClick = (e) =>{
        e.preventDefault();
        setDisableOtherYR(!disableYR)
        let localData = getLocalStorageMovies();
        if(filteredByRev){
            setList(localData.content.sort((a, b) => a.revenue < b.revenue ? 1 : -1).slice(0,  10));
        }else{
            setList(localData.content.sort((a, b) => a.ranking > b.ranking ? 1 : -1).slice(0, 10));
        }
        dataTable.current.scrollIntoView({ behavior: 'smooth' })
        setFilteredByRev(!filteredByRev);
    }
    const handleRedoYear = (e) => {
        e.preventDefault();
        setToggleYear(true)
        dataTable.current.scrollIntoView({ behavior: 'smooth' })
    }

    React.useEffect(()=>{
        let localData = getLocalStorageMovies();
        if(selectedYear!=null)
        setList(localData.content.filter((item)=> String(item.year) === selectedYear).sort((a, b) => a.revenue < b.revenue ? 1 : -1).slice(0, 10));
        },[selectedYear])


    return(
        <>  <p className="tableCaption">Movie ranking</p>
            <MovieModal movie={selectedMovie} toggle={toggle} >{}</MovieModal>
            <div className="filters">
                <button disabled={disableBR} className={!filteredByRev ? "biggestRevTrue" : "biggestRevFalse"} onClick={handleBiggestRevenueClick}>Top 10 Revenue</button>
                <button disabled={disableYR} className={!filteredByYearRev ? "yearRevTrue" : "yearRevFalse"} onClick={handleYearRevenueClick}>{selectedYear ? "Top 10 Revenue "+selectedYear :"Top 10 Revenue per Year"}</button>
                {selectedYear ? <img src={redo} alt={"redo year select"} onClick={handleRedoYear} /> : <></>}
                <FilterModal setDisableOtherBR={setDisableOtherBR} setSelectedYear={setSelectedYear} setFilteredByYearRev={setFilteredByYearRev} setToggleYear={setToggleYear} toggle={toggleYear}/>
            </div>
            <div className="movietableDiv" onScroll={onScroll}>
            <table className="movietable" ref={dataTable} >
            <thead className="tableHead">
            <tr className="tableHeadRow">
                <th className="tableHeader">RANKING</th>
                <th className="headerTitle">TITLE</th>
                <th className="headerYear">YEAR</th>
                <th className="headerRev">REVENUE</th>
                <th className="tableIcon"><br>{ }</br></th>
            </tr>
            </thead>
                <tbody className="tableBody"   >
            {
                list.map(
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
                <div className="loader-wrapper" hidden={!loading}>
                    <div className="loader">{}</div>
                </div>
            </div>

        </>
    )
}