import { Schema, model, models } from "mongoose";

const ModSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: [true, "Missing creator"]
    },
    collections:{
        type: [String],
        default: []
        
    },
    project_id: {
        type: String,
        require: [true, "Missing mod_id"]
    },
    project_type:{
        type: String
    },
    title: {
        type: String,
        require: [true, "Missing mod title"]
    },
    icon_url: {
        type: String
    },
    client_side:{
        type: String
    },
    server_side:{
        type: String
    },
    categories:{
        type: [String]
    },
    loaders:{
        type: [String]
    } 

});

const Mod = models.Mod || model('Mod', ModSchema);

export default Mod;
