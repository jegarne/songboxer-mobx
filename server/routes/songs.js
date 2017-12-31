import Song from '../models/Song'

export async function getSongs(ctx) {

  if (!ctx.account.id) {
    ctx.body = []
    return
  }

  const response = await Song.find({
    createdBy: ctx.account
  }).limit(50).exec()

  ctx.body = response
}

export async function addSong(ctx) {
  const { fields } = ctx.request

  if (!fields.title) throw new Exception('[Song title] not provided')

  const newSong = new Song({
    title: fields.title,
    createdBy: ctx.account
  })
  const response = await newSong.save()

  ctx.body = response
}

export async function removeSong(ctx) {
  const { fields } = ctx.request

  if (!fields.id) throw new Exception('[Song id] not provided')

  const response = await Song.remove({ _id: fields.id })

  ctx.body = response ? { success: true } : { success: false }
}

export async function updateSong(ctx) {
  const { fields } = ctx.request

  if (!fields.title) throw new Exception('[Song title] not provided')

  const response = await Song.findByIdAndUpdate(fields.id, fields, { new: true })

  ctx.body = response
}
