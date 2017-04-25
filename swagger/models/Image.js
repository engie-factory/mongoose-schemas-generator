import winston from 'winston';
import mongoose from 'mongoose';

// Overwrite mongoose promise module
mongoose.Promise = Promise;

/**
 * Image Schema
 */
const ImageSchema = new mongoose.Schema({
  width: {
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
  height: {
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
  url: {
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
}
}, {
  collection: 'images',
  autoIndex: true,
  minimize: false,
  timestamps: true
});

/**
 * Methods
 */
/**
*Uncomment if needed

ImageSchema.methods.findSimilarParam = () => new Promise((resolve, reject) => {
  this.model('Image').find({ param: this.param }, (err, res) => {
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

ImageSchema.statics.findByParam = param => new Promise((resolve, reject) => {
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

ImageSchema.query.byParam = param => this.find({ param: new RegExp(param, 'ig') });
*/

/**
 * Indexes
 */
 /**
*Uncomment if needed

ImageSchema.index({ param: 1, type: -1 });
*/

/**
 * Virtuals
 *//**
*Uncomment if needed

ImageSchema.virtual('fullName')
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

ImageSchema.pre('init', (next) => {
  // do something before a document is returned from mongodb
  next(); // if no errors, else call next(err)
});

ImageSchema.pre('validate', (next) => {
  // do something before executing registered validation rules for this document
  next(); // if no errors, else call next(err)
});

ImageSchema.pre('save', (next) => {
  // do something before saving this document
  next(); // if no errors, else call next(err)
});

ImageSchema.pre('remove', (next) => {
  // do something before removing this document
  next(); // if no errors, else call next(err)
});
*/

/**
 * Post Middleware
 */
 /**
*Uncomment if needed

ImageSchema.post('init', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s initiated', doc._id);
});

ImageSchema.post('validate', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s validated', doc._id);
});

ImageSchema.post('save', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s saved', doc._id);
});

ImageSchema.post('remove', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s removed', doc._id);
});
*/

/**
 * @typedef Image
 */
export default mongoose.model('Image', ImageSchema);