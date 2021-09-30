const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // Mongodb connection 
        const con = await mongoose.connect(process.env.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
// exporting connectDB 
module.exports = connectDB