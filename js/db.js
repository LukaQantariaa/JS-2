class movieDB {
    constructor(key) {
        this.url = `http://www.omdbapi.com/?apiKey=${key}&`
    }

    getMoviesByTitle(title) {
        return fetch(`${this.url}s=${title}&plot=full`)
            .then( res=> res.json())
    }

    getMoviesById(id) {
        return fetch(`${this.url}i=${id}`)
            .then( res=> res.json())
    }
}



