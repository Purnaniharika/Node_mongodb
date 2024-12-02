const mongoose = require("mongoose");
async function connectMongoDb(url){
    //Connection with database
    return mongoose.connect(url)


}
module.exports = {
    connectMongoDb,
}