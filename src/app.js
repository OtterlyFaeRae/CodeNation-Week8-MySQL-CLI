const { sequelize } = require('./db/connection');
const { createMovie, readMovie, updateMovie, deleteMovie } = require('./movie/functions')
const yargs = require('yargs')

const app = async(yargsObj) => {
    await sequelize.sync({alter:true})
    if(yargsObj.create){
        createMovie({title: yargsObj.title, actor: yargsObj.actor})
    } else if(yargsObj.read){
        readMovie({title: yargsObj.title, actor: yargsObj.actor});
    } else if(yargsObj.update){
        updateMovie({title: yargsObj.title, actor: yargsObj.actor});
    } else if(yargsObj.delete){
        deleteMovie({title:yargsObj.title});
    } else {
        console.log('No command detected. Please input --create, --read, --update or --delete.')
    }
}

app(yargs.argv)