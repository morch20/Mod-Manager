import { Schema, model, models } from 'mongoose';

const CollectionSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: [true, "user ID is required!"]
    },
    collections: {
        type: [String],
        default: [],
    }
});

const Collection = models.Collection || model('Collection', CollectionSchema);

export default Collection;