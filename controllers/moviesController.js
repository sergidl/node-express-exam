import HttpError from "http-errors";
import moviesModel from '../models/moviesModel.js';

const getAllMovies = (req, res) => {

    console.log("---> EX:moviesController::getAllMovies");

    const movies = moviesModel.getMovies();
    res.json(movies);
}

const getMovieById = (req, res, next) => {

    console.log("---> EX:moviesController::getMovieById");

    if (!req.params.id)
        next(HttpError(400, { message: 'no parameter found' }));
    try {

        const id = req.params.id;
        const movie = moviesModel.getMovieById(id);
        res.json(movie);

    } catch (error) {
        next(HttpError(400, { message: error.message }));
    }

}

const removeMovie = (req, res, next) => {
    console.log("---> EX:moviesController::removeMovie");

    if (!req.params.id)
        next(HttpError(400, { message: 'no parameter found' }));

    const id = req.params.id;
    if (moviesModel.removeMovie(id) == -1) {
        next(HttpError(400, { message: 'Ups! Movie no existe' }));

    }

    getAllMovies(req, res);


}

const createMovie = (req, res, next) => {
    console.log(`---> EX:moviesController::createMovie`);

    if (!req.body)
        next(HttpError(400, { message: 'Ups! parametro de entrada incorrecto' }));

    try {

        moviesModel.createMovie(req.body);
        getAllMovies(req, res);

    } catch (error) {
        next(HttpError(400, { message: error.message }));
    }

}

const updateMovie = (req, res, next) => {
    console.log(`---> EX:moviesController::updateMovie`);


    try {
        if (!req.body)
            next(HttpError(400, { message: 'Ups! parametro de entrada incorrecto' }));

        moviesModel.updateMovie(req.body);
        getAllMovies(req, res);

    } catch (error) {
        next(HttpError(400, { message: error.message }));
    }
}


const getMovieBy = (req, res, next) => {
    console.log(`---> EX:moviesController::getMovieBy`);

    if (!req.body)
        next(HttpError(400, { message: 'Ups! parametro de entarada incorrecto' }));

    const movies = moviesModel.getMovieBy(req.body);
    res.json(movies);
}

//TODO: Actuaizar API
const addActors = (req, res, next) => {
    console.log(`---> EX:moviesController::addActors`);
    if (!req.body)
        next(HttpError(400, { message: 'no parameter found' }));

    const _movie = moviesModel.addActors(req.body);
    res.json(_movie);
}


// TODO: Nueva API devuelve todas las películas donde participa un actor
const getMoviesFromActor = (req, res, next) => {
    console.log(`---> EX:moviesController::getMoviesFromActor`);

    if (!req.body)
        next(HttpError(400, { message: 'Ups! parametro de entarada incorrecgetMovieByto' }));

    const movies = moviesModel.getMoviesFromActor(req.body);
    res.json(movies);
};


export default {
    getAllMovies,
    getMovieById,
    removeMovie,
    createMovie,
    updateMovie,
    getMovieBy,
    addActors,
    getMoviesFromActor
}
