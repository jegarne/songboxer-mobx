import SetList from '../models/SetList'

export async function getSetLists(ctx) {

  if (!ctx.account.id) {
    ctx.body = []
    return
  }

  const response = await SetList.find({
    createdBy: ctx.account
  }).limit(50).exec()

  ctx.body = response
}

export async function addSetList(ctx) {
  const { fields } = ctx.request

  if (!fields.title) throw new Exception('[title] not provided')

  const newSetList = new SetList({
    title: fields.title,
    createdBy: ctx.account
  })
  const response = await newSetList.save()

  ctx.body = response
}

export async function updateSetList(ctx) {
  const { fields } = ctx.request

  if (!fields.title) throw new Exception('[set title] not provided')

  const response = await SetList.findByIdAndUpdate(fields.id, fields, { new: true })

  ctx.body = response
}

export async function removeSetList(ctx) {
  const { fields } = ctx.request

  if (!fields.id) throw new Exception('[id] not provided')

  const response = await SetList.remove({ _id: fields.id })

  ctx.body = response ? { success: true } : { success: false }
}
