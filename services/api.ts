interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    backdrop_path: string;
    genres: { id: number; name: string }[];
    runtime: number;
    vote_average: number;
    vote_count: any;
    budget: any;
    revenue: any;
    production_companies: any
  }

export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API}`
    }
}

export const fetchMovies = async({ query }: {query: string})=> {
    const endPoint = query ? 
    `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    :
    `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`

    const response = await fetch(endPoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers
    })

    if (!response.ok) {
        // @ts-ignore
        throw new Error("Failed to fetch", response?.statusText)
    } 

    const data = await response.json()
    return data.results
}

export const fetchMovieDetail = async(movieId: string): Promise<MovieDetails>=> {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: "GET",
            headers: TMDB_CONFIG.headers
        })

        if (!response.ok) {
            // @ts-ignore
            throw new Error("Failed to fetch movie Detail", response?.statusText)
        } 
    
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}