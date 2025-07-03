import mongoose from 'mongoose';


const favouriteSchema = new mongoose.Schema({
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'
    }]

}, {
    timestamps: true
});



export default mongoose.model('Favourite', favouriteSchema);
