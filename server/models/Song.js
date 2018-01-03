import database from 'core/database'
import { Schema } from 'mongoose'

const schema = new Schema({
  title: String,
  artist: String,
  videoURL: String,
  key: String,
  lyrics: String,
  notes: String,
  seconds: Number,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
})

// Options
schema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id
    delete ret._id
  }
})

export default database.model('Song', schema)
