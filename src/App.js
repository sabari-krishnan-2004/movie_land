import { useState, useEffect } from 'react';
import './app.css';
import SearchIcon from './search.svg'
import Moviecard from './Moviecard'


const API_URL = 'http://www.omdbapi.com?apikey=d537fbb1';



const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm,setSearchTerm]=useState('')

    const searchmovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchmovies('spiderman')
    }, [])
    return (
        <div className='app'>
            <h1>Movie Land</h1>

            <div className='search'>
                <input
                    placeholder='search the movie title'
                    value={searchTerm}
                    onChange={(e) =>setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchmovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (<div className='container'>
                        {movies.map((movie)=>(
                            <Moviecard movie={movie}/>
                        ))};
                    </div>

                    ):(
                        <div className='empty'>
                            <h2>No movies found</h2>
                        </div>
                    )
            }

        </div>
    );
}

export default App;