import winston from 'winston';
import mongoose from 'mongoose';

// Overwrite mongoose promise module
mongoose.Promise = Promise;

/**
 * Media Schema
 */
const MediaSchema = new mongoose.Schema({
  // Description: Epoc time (ms)
  createdTime: {
    type: Number,
    min: null,
    max: null,
    required: false,
    default: false,
    select: false,
    validate: null,
    get: null,
    set: null,
    unique: false,
    sparse: false
},
  type: {
    type: String,
    lowercase: false,
    uppercase: false,
    trim: null,
    match: null,
    enum: null,
    minlength: null,
    maxlength: null,
    required: false,
    default: false,
    select: false,
    validate: null,
    get: null,
    set: null,
    unique: false,
    sparse: false
},
  filter: {
    type: String,
    lowercase: false,
    uppercase: false,
    trim: null,
    match: null,
    enum: null,
    minlength: null,
    maxlength: null,
    required: false,
    default: false,
    select: false,
    validate: null,
    get: null,
    set: null,
    unique: false,
    sparse: false
},
  tags: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }
],
  id: {
    type: Number,
    min: null,
    max: null,
    required: false,
    default: false,
    select: false,
    validate: null,
    get: null,
    set: null,
    unique: false,
    sparse: false
},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MiniProfile'
},
  usersInPhoto: [
    {
        type: Schema.Types.ObjectId,
        ref: 'MiniProfile'
    }
],
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
},
  comments: {
    count: {
        type: Number,
        min: null,
        max: null,
        required: false,
        default: false,
        select: false,
        validate: null,
        get: null,
        set: null,
        unique: false,
        sparse: false
    },
    data: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
  likes: {
    count: {
        type: Number,
        min: null,
        max: null,
        required: false,
        default: false,
        select: false,
        validate: null,
        get: null,
        set: null,
        unique: false,
        sparse: false
    },
    data: [
        {
            type: Schema.Types.ObjectId,
            ref: 'MiniProfile'
        }
    ]
},
  images: {
    properties: {
        lowResolution: {
            type: Schema.Types.ObjectId,
            ref: 'Image'
        },
        thumbnail: {
            type: Schema.Types.ObjectId,
            ref: 'Image'
        },
        standardResolution: {
            type: Schema.Types.ObjectId,
            ref: 'Image'
        }
    }
},
  videos: {
    properties: {
        lowResolution: {
            type: Schema.Types.ObjectId,
            ref: 'Image'
        },
        standardResolution: {
            type: Schema.Types.ObjectId,
            ref: 'Image'
        }
    }
}
}, {
  collection: 'medias',
  autoIndex: true,
  minimize: false,
  timestamps: true
});

/**
 * Methods
 */
/**
*Uncomment if needed

MediaSchema.methods.findSimilarParam = () => new Promise((resolve, reject) => {
  this.model('Media').find({ param: this.param }, (err, res) => {
    if (err) {
      reject(err);
    }
    resolve(res);
  });
});
*/

/**
 * Statics
 */
/**
*Uncomment if needed

MediaSchema.statics.findByParam = param => new Promise((resolve, reject) => {
  this.find({ param: new RegExp(param, 'ig') }, (err, res) => {
    if (err) {
      reject(err);
    }
    resolve(res);
  });
});
*/

/**
 * Query Helpers
 */
/**
*Uncomment if needed

MediaSchema.query.byParam = param => this.find({ param: new RegExp(param, 'ig') });
*/

/**
 * Indexes
 */
 /**
*Uncomment if needed

MediaSchema.index({ param: 1, type: -1 });
*/

/**
 * Virtuals
 *//**
*Uncomment if needed

MediaSchema.virtual('fullName')
  .get(() => `${this.name.first} ${this.name.last}`)
  .set((fullName) => {
    this.name.first = fullName.substr(0, fullName.indexOf(' '));
    this.name.last = fullName.substr(fullName.indexOf(' ') + 1);
  });
*/

/**
 * Pre Middleware
 *//**
*Uncomment if needed

MediaSchema.pre('init', (next) => {
  // do something before a document is returned from mongodb
  next(); // if no errors, else call next(err)
});

MediaSchema.pre('validate', (next) => {
  // do something before executing registered validation rules for this document
  next(); // if no errors, else call next(err)
});

MediaSchema.pre('save', (next) => {
  // do something before saving this document
  next(); // if no errors, else call next(err)
});

MediaSchema.pre('remove', (next) => {
  // do something before removing this document
  next(); // if no errors, else call next(err)
});
*/

/**
 * Post Middleware
 */
 /**
*Uncomment if needed

MediaSchema.post('init', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s initiated', doc._id);
});

MediaSchema.post('validate', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s validated', doc._id);
});

MediaSchema.post('save', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s saved', doc._id);
});

MediaSchema.post('remove', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s removed', doc._id);
});
*/

/**
 * @typedef Media
 */
export default mongoose.model('Media', MediaSchema);