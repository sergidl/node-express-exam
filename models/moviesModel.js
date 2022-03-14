import movie from './movies/movies.js';
import actor from './actors/actors.js';
import moviePojo from '../models/movies/moviePojo.js';
import actorPojo from '../models/actors/actorPojo.js';


class MoviesModel {


    getMovies() {

        console.log("---> EX:moviesModel::getMovies");

        const movies = movie.getMovies();
        movies.forEach(element => {
            element.actors = actor.getActorsById(element.id).actors;
        });


        return movies;
    }
    getMovieById(id) {

        console.log(`---> EX:moviesModel::getMovieById = ${id}`);

        const _movie = movie.getMovieById(id);
        if (typeof _movie == 'undefined')
            throw new Error('Ups! movie no existe');

        _movie.actors = actor.getActorsById(_movie.id).actors;
        return _movie;
    }

    removeMovie(id) {

        console.log(`---> EX:moviesModel::removeMovie = ${id}`);

        const index = movie.removeMovie(id);
        if (index != -1) { actor.removeActors(id) }
        return index;
    }


    getMovieBy(elem) {
        console.log(`---> EX:moviesModel::getMovieBy = ${elem.value}`);


        const _movies = movie.getMovieBy(elem);

        _movies.forEach(element => {
            element.actors = actor.getActorsById(element.id).actors;

        });
        return _movies;
    }


    createMovie(req) {

        console.log(`---> EX:moviesModel::createMovie = ${req.id}`);

        const new_movie = moviePojo(req);
        if (typeof new_movie == 'undefined')
            throw new Error('Ups! Error new_movie');

        const new_actor = actorPojo(req);
        if (typeof new_actor == 'undefined')
            throw new Error('Ups! Error new_actor');

        movie.createMovie(new_movie);
        actor.createActors(new_actor);
    }

    updateMovie(req) {
        console.log(`---> EX:moviesModel::updateMovie = ${req.id}`);

        const new_movie = moviePojo(req);
        if (typeof new_movie == 'undefined')
            throw new Error('Ups! Error new_movie');

        const new_actor = actorPojo(req);
        if (typeof new_actor == 'undefined')
            throw new Error('Ups! Error new_actor');

        const _movie = movie.updateMovie(new_movie);
        if (typeof _movie == 'undefined')
            throw new Error('Ups! Error al actualizar Movie');

        const _actor = actor.updateActors(new_actor);
        if (typeof _actor == 'undefined')
            throw new Error('Ups! Error al actualizar Actor');


    }

    getMoviesFromActor(req) {
        console.log(`---> EX:moviesModel::getMoviesFromActor = ${req.id}`);

        let _movies = [];

        const movies_id = actor.getIDFromActor(req)
        movies_id.forEach(element => {
            _movies.push(movie.getMovieById(element.id));
        });

        return _movies;
    }

    addActors(req) {
        console.log(`---> EX:moviesModel::addActors = ${req.id}`);

        actor.addActorToMovie(req)
        return this.getMovieById(req.id);

    }

}

export default new MoviesModel()
