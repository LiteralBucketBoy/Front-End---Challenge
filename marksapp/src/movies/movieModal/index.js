import React from "react";
import "./index.css";
import {getMovieByID} from "../api-data/MoviesContext";
import closeImg from "./close-24px.svg";

export function MovieModal({movie,toggle}) {

    const [movieData, setMovieData] = React.useState();
    const [modalShow, setModalShow] = React.useState(false);

    React.useEffect( ()=> {
        async function B() {
            let localMovieData = JSON.parse(localStorage.getItem("movieData" + movie));
            if (movie !== undefined && localMovieData==null){
                await getMovieByID(movie).then(() => setMovieData(JSON.parse(localStorage.getItem("movieData" + movie)))).then(()=>setModalShow(true)).then()
            }else if(movie !== undefined){
                setMovieData(localMovieData)
                setModalShow(true)
            }

        }B().then(()=>{})
    } , [movie,toggle]);


    async function handleClose(){
        setModalShow(false);
    }

    return (
        <div  id="modal"  className="modal" style={{ display: modalShow ? "block" : "none" }}>
            <section className="modal-main">
                <div className="modal-header">
                    <h1 className="modal-title">{movieData ? movieData.title : ""}</h1>
                    <button className="closeBtn" type="button" onClick={handleClose}><img src={closeImg} alt={"close X"}/>
                        Close
                    </button>
                </div>
                <div className="modal-body">

                </div>
            </section>
        </div>

    );
}