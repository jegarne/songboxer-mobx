import Set from '../models/Set'

export async function getSets(ctx) {

  if (!ctx.account.id) {
    ctx.body = []
    return
  }

  const response = await Set.find({
    createdBy: ctx.account
  }).limit(50).exec()

  ctx.body = response
}

export async function addSet(ctx) {
  const { fields } = ctx.request

  if (!fields.title) throw new Exception('[set title] not provided')

  const newSet = new Set({
    title: fields.title,
    createdBy: ctx.account
  })
  const response = await newSet.save()

  ctx.body = response
}

export async function removeSet(ctx) {
  const { fields } = ctx.request

  if (!fields.id) throw new Exception('[set id] not provided')

  const response = await Set.remove({ _id: fields.id })

  ctx.body = response ? { success: true } : { success: false }
}

export async function updateSet(ctx) {
  const { fields } = ctx.request

  if (!fields.title) throw new Exception('[set title] not provided')

  const response = await Set.findByIdAndUpdate(fields.id, fields, { new: true })

  ctx.body = response
}

export async function addSong(ctx) {
  const { fields } = ctx.request

  if (!fields.songId) throw new Exception('[song id] not provided')

  const response = await Set.findByIdAndUpdate(fields.setId,
    { "$push": { "songs": fields.songId } },
  { new: true })

  ctx.body = response
}
