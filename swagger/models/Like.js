import winston from 'winston';
import mongoose from 'mongoose';

// Overwrite mongoose promise module
mongoose.Promise = Promise;

/**
 * Like Schema
 */
const LikeSchema = new mongoose.Schema({
  userName: {
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
  firstName: {
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
  lastName: {
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
}
}, {
  collection: 'likes',
  autoIndex: true,
  minimize: false,
  timestamps: true
});

/**
 * Methods
 */
/**
*Uncomment if needed

LikeSchema.methods.findSimilarParam = () => new Promise((resolve, reject) => {
  this.model('Like').find({ param: this.param }, (err, res) => {
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

LikeSchema.statics.findByParam = param => new Promise((resolve, reject) => {
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

LikeSchema.query.byParam = param => this.find({ param: new RegExp(param, 'ig') });
*/

/**
 * Indexes
 */
 /**
*Uncomment if needed

LikeSchema.index({ param: 1, type: -1 });
*/

/**
 * Virtuals
 *//**
*Uncomment if needed

LikeSchema.virtual('fullName')
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

LikeSchema.pre('init', (next) => {
  // do something before a document is returned from mongodb
  next(); // if no errors, else call next(err)
});

LikeSchema.pre('validate', (next) => {
  // do something before executing registered validation rules for this document
  next(); // if no errors, else call next(err)
});

LikeSchema.pre('save', (next) => {
  // do something before saving this document
  next(); // if no errors, else call next(err)
});

LikeSchema.pre('remove', (next) => {
  // do something before removing this document
  next(); // if no errors, else call next(err)
});
*/

/**
 * Post Middleware
 */
 /**
*Uncomment if needed

LikeSchema.post('init', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s initiated', doc._id);
});

LikeSchema.post('validate', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s validated', doc._id);
});

LikeSchema.post('save', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s saved', doc._id);
});

LikeSchema.post('remove', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s removed', doc._id);
});
*/

/**
 * @typedef Like
 */
export default mongoose.model('Like', LikeSchema);