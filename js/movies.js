const db = new movieDB('736cdb06')

async function averageBoxOfficeByTitle(title) {

    // Async await
    // async function asyncForEach(array, callback) {
    //     for (let index = 0; index < array.length; index++) {
    //         await callback(array[index], index, array);
    //     }
    // }

    let allPromise = []
    let average = 0;
    db.getMoviesByTitle(title).then((movies)=>{
        console.log(movies)
        if( movies.Response === "True" ) {
            movies.Search.forEach((res) => {
                const promise = db.getMoviesById(res.imdbID).then(movie => {
                    console.log(movie)
                    if(movie.BoxOffice) {
                        if( movie.BoxOffice != 'N/A' ) {
                            let boxOffice = parseInt(movie.BoxOffice.replace('$', '').replace(/,/g, ''));
                            //average = average*1 + 1*boxOffice;
                            return boxOffice
                        }
                    }
                    return 0;
                })
                console.log(promise)
                allPromise.push(promise)
            });

            //Async await
            // const start = async () => {
            //     await asyncForEach(movies.Search, async (res) => {
            //         console.log('shevida')
            //         await db.getMoviesById(res.imdbID).then(movie => {
            //             console.log('shevida2')
            //             if(movie.BoxOffice) {
            //                 if( movie.BoxOffice != 'N/A' ) {
            //                     let boxOffice = parseInt(movie.BoxOffice.replace('$', '').replace(/,/g, ''));
            //                     average = average*1 + 1*boxOffice;
            //                     //console.log(average);
            //                 }
            //             }
            //         })
            //     });
            //       console.log('morcha: ' + average);
            // }

            //start();
    
        }

        Promise.all(allPromise).then(value => {
            console.log(value)
            value.forEach( (res) => {
                average += res
            })
            console.log(average/allPromise.length)
        })
    });
}


console.log(averageBoxOfficeByTitle('avengers'));

// const db = new movieDB('736cdb06');

// db.getMoviesByTitle('roma').then(movies => {
//     movies.Search.forEach((res) => {
//         db.getMoviesById(res.imdbID).then(movie => {
//             console.log(movie)
//         });
//     });
// });