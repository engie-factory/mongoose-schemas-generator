import winston from 'winston';
import mongoose from 'mongoose';

// Overwrite mongoose promise module
mongoose.Promise = Promise;

/**
 * Profile Schema
 */
const ProfileSchema = new mongoose.Schema({
  // Description: First name of the Uber user.
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
  // Description: Last name of the Uber user.
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
  // Description: Email address of the Uber user
  email: {
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
  // Description: Image URL of the Uber user.
  picture: {
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
  // Description: Promo code of the Uber user.
  promoCode: {
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
  collection: 'profiles',
  autoIndex: true,
  minimize: false,
  timestamps: true
});

/**
 * Methods
 */
ProfileSchema.methods.findSimilarParam = () => new Promise((resolve, reject) => {
  this.model('Profile').find({ param: this.param }, (err, res) => {
    if (err) {
      reject(err);
    }
    resolve(res);
  });
});

/**
 * Statics
 */
ProfileSchema.statics.findByParam = param => new Promise((resolve, reject) => {
  this.find({ param: new RegExp(param, 'ig') }, (err, res) => {
    if (err) {
      reject(err);
    }
    resolve(res);
  });
});

/**
 * Query Helpers
 */
ProfileSchema.query.byParam = param => this.find({ param: new RegExp(param, 'ig') });

/**
 * Indexes
 */
ProfileSchema.index({ param: 1, type: -1 });

/**
 * Virtuals
 */
ProfileSchema.virtual('fullName')
  .get(() => `${this.name.first} ${this.name.last}`)
  .set((fullName) => {
    this.name.first = fullName.substr(0, fullName.indexOf(' '));
    this.name.last = fullName.substr(fullName.indexOf(' ') + 1);
  });

/**
 * Pre Middleware
 */
ProfileSchema.pre('init', (next) => {
  // do something before a document is returned from mongodb
  next(); // if no errors, else call next(err)
});

ProfileSchema.pre('validate', (next) => {
  // do something before executing registered validation rules for this document
  next(); // if no errors, else call next(err)
});

ProfileSchema.pre('save', (next) => {
  // do something before saving this document
  next(); // if no errors, else call next(err)
});

ProfileSchema.pre('remove', (next) => {
  // do something before removing this document
  next(); // if no errors, else call next(err)
});

/**
 * Post Middleware
 */
ProfileSchema.post('init', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s initiated', doc._id);
});

ProfileSchema.post('validate', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s validated', doc._id);
});

ProfileSchema.post('save', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s saved', doc._id);
});

ProfileSchema.post('remove', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s removed', doc._id);
});

/**
 * @typedef Profile
 */
export default mongoose.model('Profile', ProfileSchema);
