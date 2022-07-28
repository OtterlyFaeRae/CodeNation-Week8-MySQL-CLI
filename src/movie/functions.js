const Movie = require('./table');

exports.createMovie = async(movieObj) => {
    try {
        const newMovie = await Movie.create(movieObj);
        console.log(`Added movie: ${newMovie.title}`);
    } catch (error) {
        console.log(error)
    };
};

exports.readMovie = async(movieObj) => {
    try {
        const movies = await Movie.findAll({attributes:['title', 'actor']});
        console.log('All movies:', JSON.stringify(movies, null, 1));
    } catch (error) {
        console.log(error)
    };
};

exports.updateMovie = async(movieObj) => {
    try {
        await Movie.update({actor: movieObj.actor}, {
            where: {
                title: movieObj.title
            }
        })
    } catch (error) {
        console.log(error);
    };
};

exports.deleteMovie = async(movieObj) => {
    try {
        await Movie.destroy({
            where: {
                title: movieObj.title
            }
        });
    } catch (error) {
        console.log(error);
    };
};