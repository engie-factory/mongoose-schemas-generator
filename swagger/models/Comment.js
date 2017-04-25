import winston from 'winston';
import mongoose from 'mongoose';

// Overwrite mongoose promise module
mongoose.Promise = Promise;

/**
 * Comment Schema
 */
const CommentSchema = new mongoose.Schema({
  id: {
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
  createdTime: {
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
  text: {
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
  location: {
    id: {
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
    name: {
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
    latitude: {
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
    longitude: {
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
    }
},
  locations: [
    {
        id: {
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
        name: {
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
        latitude: {
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
        longitude: {
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
        }
    }
],
  like: {
    type: Schema.Types.ObjectId,
    ref: 'Like'
}
}, {
  collection: 'comments',
  autoIndex: true,
  minimize: false,
  timestamps: true
});

/**
 * Methods
 */
/**
*Uncomment if needed

CommentSchema.methods.findSimilarParam = () => new Promise((resolve, reject) => {
  this.model('Comment').find({ param: this.param }, (err, res) => {
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

CommentSchema.statics.findByParam = param => new Promise((resolve, reject) => {
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

CommentSchema.query.byParam = param => this.find({ param: new RegExp(param, 'ig') });
*/

/**
 * Indexes
 */
 /**
*Uncomment if needed

CommentSchema.index({ param: 1, type: -1 });
*/

/**
 * Virtuals
 *//**
*Uncomment if needed

CommentSchema.virtual('fullName')
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

CommentSchema.pre('init', (next) => {
  // do something before a document is returned from mongodb
  next(); // if no errors, else call next(err)
});

CommentSchema.pre('validate', (next) => {
  // do something before executing registered validation rules for this document
  next(); // if no errors, else call next(err)
});

CommentSchema.pre('save', (next) => {
  // do something before saving this document
  next(); // if no errors, else call next(err)
});

CommentSchema.pre('remove', (next) => {
  // do something before removing this document
  next(); // if no errors, else call next(err)
});
*/

/**
 * Post Middleware
 */
 /**
*Uncomment if needed

CommentSchema.post('init', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s initiated', doc._id);
});

CommentSchema.post('validate', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s validated', doc._id);
});

CommentSchema.post('save', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s saved', doc._id);
});

CommentSchema.post('remove', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s removed', doc._id);
});
*/

/**
 * @typedef Comment
 */
export default mongoose.model('Comment', CommentSchema);