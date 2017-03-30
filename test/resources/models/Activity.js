import winston from 'winston';
import mongoose from 'mongoose';

// Overwrite mongoose promise module
mongoose.Promise = Promise;

/**
 * Activity Schema
 */
const ActivitySchema = new mongoose.Schema({
  // Description: Unique identifier for the activity
  uuid: {
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
  collection: 'activities',
  autoIndex: true,
  minimize: false,
  timestamps: true
});

/**
 * Methods
 */
ActivitySchema.methods.findSimilarParam = () => new Promise((resolve, reject) => {
  this.model('Activity').find({ param: this.param }, (err, res) => {
    if (err) {
      reject(err);
    }
    resolve(res);
  });
});

/**
 * Statics
 */
ActivitySchema.statics.findByParam = param => new Promise((resolve, reject) => {
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
ActivitySchema.query.byParam = param => this.find({ param: new RegExp(param, 'ig') });

/**
 * Indexes
 */
ActivitySchema.index({ param: 1, type: -1 });

/**
 * Virtuals
 */
ActivitySchema.virtual('fullName')
  .get(() => `${this.name.first} ${this.name.last}`)
  .set((fullName) => {
    this.name.first = fullName.substr(0, fullName.indexOf(' '));
    this.name.last = fullName.substr(fullName.indexOf(' ') + 1);
  });

/**
 * Pre Middleware
 */
ActivitySchema.pre('init', (next) => {
  // do something before a document is returned from mongodb
  next(); // if no errors, else call next(err)
});

ActivitySchema.pre('validate', (next) => {
  // do something before executing registered validation rules for this document
  next(); // if no errors, else call next(err)
});

ActivitySchema.pre('save', (next) => {
  // do something before saving this document
  next(); // if no errors, else call next(err)
});

ActivitySchema.pre('remove', (next) => {
  // do something before removing this document
  next(); // if no errors, else call next(err)
});

/**
 * Post Middleware
 */
ActivitySchema.post('init', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s initiated', doc._id);
});

ActivitySchema.post('validate', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s validated', doc._id);
});

ActivitySchema.post('save', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s saved', doc._id);
});

ActivitySchema.post('remove', (doc) => {
  // do something after
  winston.log('info', 'Document with _id %s removed', doc._id);
});

/**
 * @typedef Activity
 */
export default mongoose.model('Activity', ActivitySchema);
