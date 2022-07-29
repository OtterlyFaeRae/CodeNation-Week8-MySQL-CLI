const Movie = require('./table');

exports.createMovie = async (movieObj) => {
    try {
        //Checks for duplicates in the database.
        const dupCheckQuery = await Movie.findAll({where:{title: movieObj.title}});
        let dupCheck = dupCheckQuery[0];
        if (dupCheck === null || dupCheck === undefined) {
            dupCheck = {title: 'none'}
        }
        if (movieObj.title && (movieObj.title != dupCheck.title)) {
            //If conditions met, create an entry to the movie collection.
            await Movie.create(movieObj);
            console.log(`${movieObj.title} created.`)
        } else if (movieObj.title === dupCheck.title) {
            //If conditions not met, logs error and instructions.
            console.log(`${movieObj.title} exists in database already. --title must be unique.`)
        } else {
            console.log('Command must include --title for your entry.')
        };
    } catch (error) {
        console.log(error);
    };
};

exports.readMovie = async(movieObj) => {
    try {
        console.log(movieObj)
        if (movieObj.title){
            //If argv contains a --title, logs the entry with that title.
            console.log(JSON.stringify(await Movie.findAll({
                attributes:['title', 'actor', 'id'], 
                where:{
                    title: movieObj.title
                }
            }), null, 1));
        } else if (movieObj.actor) {
            //If argv contains --actor, logs all entries with that actor.
            console.log(JSON.stringify(await Movie.findAll({
                attributes:['title', 'actor', 'id'],
                where: {
                    actor: movieObj.actor
                }
            }), null, 1));
        } else {
            //If conditions not met, logs all entries in collection.
            console.log('All movies:', JSON.stringify(await Movie.findAll({attributes:['title', 'actor', 'id']}), null, 1));
        };
    } catch (error) {
        console.log(error)
    };
};

exports.updateMovie = async (movieObj) => {
    try {
        if (movieObj.title && movieObj.actor) {
            //If necessary data present, updates db item of --title with data given. 
            await Movie.update(
                {actor: movieObj.actor}, {
                where: {
                    title: movieObj.title
                }
            });
            console.log(`${movieObj.title} updated.`)
        } else {
            //If conditions not met, logs reason & instructions.
            console.log('Command must include --title of existing entry and value (--actor) to update.')
        };
    } catch (error) {
        console.log(error)
    };
};

exports.deleteMovie = async(movieObj) => {
    try {
        if (movieObj.title) {
            //If title present, deletes db item with that title.
            await Movie.destroy({
                where: {
                    title: movieObj.title
                }
            });
            console.log(`${movieObj.title} deleted.`)
        } else {
            //If no title, logs error and instruction.
            console.log('Command must include --title of entry to be deleted.')
        };
    } catch (error) {
        console.log(error)
    };
};