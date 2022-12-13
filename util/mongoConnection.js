import mongoose from 'mongoose';

let cache = global.mongo;

if(!cache){
    cache = global.mongo = {db: null, promise: null}
}

export default async function connectDB(){
    if(cache.db)
        return cache.db;

    if (!cache.promise){

        const opt = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        cache.promise = mongoose.connect(process.env.MONGODB_URI).then((client)=>{
            return{
                client,
                db: client.db(process.env.MONGODB_DB)
            }
        });
    }
}