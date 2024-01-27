const mongoose = require("mongoose");

const connectionToDB = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log(`MONGODB IS CONNECTED AT PORT ${process.env.DB_URL}`))
    .catch((error) => console.log(error.message))
}

module.exports = connectionToDB;