const movies = require('./db.json')
let globalId = 11;

const getAllMovies = (req, res) => {
    res.status(200).send(movies)
}

const deleteMovie = (req, res) => {
    const movies = require('./db.json');
    const { id } = req.params;
    for(let i = 0; i < movies.length; i++){
        if(movies[i].id === +id){
            movies.splice(i, 1);
            return res.status(200).send(movies);
        }
    }
    res.status(400).send('ID not found')
}

const addMovie = (req, res) => {
    const { title, rating, imageURL } = req.body;
    movies.push({
        title,
        rating, 
        imageURL,
        id: globalId,
    })
    globalId++;
    res.status(200).send(movies);
}

const updateRating = (req, res) => {
    const { id } = req.params;
    const { type } = req.body; // 'plus' or 'minus' 

    // for (let i = 0; i < movies.length; i++){
    //     if(movies[i].id === +id){
    //         if (type === 'plus' && movies[i].rating < 5) {
    //             movies[i].rating ++;
    //         } else if (type === 'minus' && movies[i].rating > 1) {
    //             movies[i].rating --
    //         }
    //         return res.status(200).send(movies)
    //     }
    // }
    const movieIndex = movies.findIndex((movie) => movie.id === +id);
    if (type === 'plus' && movies[movieIndex].rating < 5){
        movies[movieIndex].rating++;
    } else if (type === 'minus' && movies[movieIndex].rating > 1){
        movies[movieIndex].rating --
    }
    return res.status(200).send(movies)
}

module.exports = {
    getAllMovies,
    deleteMovie,
    addMovie,
    updateRating
};
 