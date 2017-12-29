import {action} from 'mobx'

export default class Sets {

  constructor(request, state) {
    this.request = request
    this.state = state
  }

  @action async add(title) {
    const result = await this.request.post(`api/sets/add`, { title })
    this.state.sets.push(result)
  }

  @action async remove(item) {
    try {
      await this.request.post(`api/sets/remove`, { id: item.id })
      this.state.sets.remove(item)
    } catch(err) {
      console.error(err)
    }
  }

  @action async browse() {
    this.state.sets = await this.request.get(`api/sets`)
  }
}
