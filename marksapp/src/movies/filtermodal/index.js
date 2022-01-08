import React from "react";
import "./index.css"
import {getLocalStorageMovies} from "../api-data/MoviesContext";

export function FilterModal({toggle,setToggleYear,setFilteredByYearRev,setSelectedYear}){
    React.useEffect(()=>{setModalShow(toggle)},[toggle])
    const ref = React.useRef()
    const [modalShow, setModalShow] = React.useState(false);
    React.useEffect(() => {
        const checkClickedOut = e => {
            e.preventDefault();
            if (modalShow && ref.current && !ref.current.contains(e.target)) {
                setModalShow(false)
                setToggleYear(false)
                setFilteredByYearRev(true);
            }
        }
             document.addEventListener("mousedown", checkClickedOut)
            return () => {
            document.removeEventListener("mousedown", checkClickedOut)
             }
    }, [modalShow,setToggleYear,setFilteredByYearRev])


    const [uniqueYears,setUniqueYears] = React.useState([]) ;
    React.useEffect(()=>{
        let years = []
        let localData = getLocalStorageMovies();
        localData.content.map(movie => {
            if (years.indexOf(movie.year) === -1) {
                years.push(movie.year)
            }
            return ""
        });
        years.sort((a, b) => a < b ? 1 : -1)
        setUniqueYears(years);

    },[])
    const handleYearClick = (e)=> {
        e.preventDefault();
        setSelectedYear(e.target.value);
        setModalShow(false)
        setToggleYear(false)
    }
    return (
       <div  id="modal-year"  className="modal-year"  style={{ display: modalShow ? "block" : "none" }}>
        <section ref={ref} className="modal-year-main">
           <div className="modal-year-label">
               <label>Select a year</label>
           </div>
           {
                   uniqueYears.map((item, i) =>
                       <option onClick={handleYearClick} className="modal-year-items" key={item} value={item}>{item}</option>
                   )
           }
        </section>
     </div>

)
}