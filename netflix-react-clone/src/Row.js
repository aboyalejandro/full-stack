import React, { useState, useEffect} from 'react'
import axios from './axios';
import "./Row.css"
import requests from "./requests"


const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl }) {

    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            //console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]); //variable outside of the useEffect, its a dependency on change

    // console.table(movies)

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {/* row_posters */}
                {movies.map((movie) => (
                    <img 
                        className = "row_poster"
                        key={movie.id} 
                        src={`${base_url}${movie.back_path || movie.backdrop_path
                        }`} 
                        alt={movie.name}
                        />
                ))}
            </div>
        </div>
    )
}

export default Row
