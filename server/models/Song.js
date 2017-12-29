import database from 'core/database'
import { Schema } from 'mongoose'

const schema = new Schema({
  title: String,
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
