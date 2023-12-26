const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  oauthId: {
    type: String,
    required: true,
    unique: true
  },
  preferences: {
    type: Object,
    default: {}
  },
  history: {
    type: Array,
    default: []
  }
});

UserSchema.methods.updatePreferences = function(newPreferences) {
  this.preferences = newPreferences;
  this.save();
};

UserSchema.methods.addToHistory = function(articleId) {
  this.history.push(articleId);
  this.save();
};

module.exports = mongoose.model('User', UserSchema);
