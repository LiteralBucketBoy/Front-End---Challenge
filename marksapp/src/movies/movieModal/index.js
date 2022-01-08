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
                    <h1 className="modal-title">{movieData ? movieData.title : ""}
                        <div className="closeDiv" onClick={handleClose}>
                            <img src={closeImg} alt={"close X"}/>
                            <a className="closeBtn" >
                                Close
                            </a>
                        </div>

                    </h1>

                </div>
                <div className="modal-body">
                    <div className="body-item">
                        <label>Year</label>
                        <p>{movieData ? movieData.year : ""}</p>
                    </div>

                    <div className="body-item">
                    <label>Genre</label>
                    <p>{movieData ? movieData.genre : ""}</p>
                    </div>

                    <div className="body-item">
                    <label>Description</label>
                    <p>{movieData ? movieData.description : ""}</p>
                    </div>

                    <div className="body-item2">
                        <div className='row'>
                            <div className='column'>
                                <label>Director</label>
                                <p className="people">{movieData ? movieData.director : ""}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='column'>
                                <label>Actors</label>
                                <p className="people">{movieData ? movieData.actors : ""}</p>
                            </div>
                        </div>
                      </div>
                    <div className="body-item">
                    <label>Runtime</label>
                    <p>{movieData ? movieData.runtime : ""}</p>
                    </div>

                    <div className="body-item">
                    <label>Rating</label>
                    <p>{movieData ? movieData.rating : ""}</p>
                    </div>

                    <div className="body-item">
                    <label>Votes</label>
                    <p>{movieData ? movieData.votes : ""}</p>
                    </div>

                    <div className="body-item">
                    <label>Revenue</label>
                    <p>{movieData ? movieData.revenue : ""}</p>
                    </div>

                    <div className="body-item">
                    <label>Metascore</label>
                    <p>{movieData ? movieData.metascore : ""}</p>
                    </div>

                </div>
            </section>
        </div>

    );
}