import {action} from 'mobx'

export default class SetLists {

  constructor(request, state) {
    this.request = request
    this.state = state
  }

  @action async add(title) {
    const result = await this.request.post(`api/setlists/add`, { title })
    this.state.setLists.push(result)
  }

  @action async remove(item) {
    try {
      await this.request.post(`api/setlists/remove`, { id: item.id })
      this.state.setLists.remove(item)
    } catch(err) {
      console.error(err)
    }
  }

  @action async update(item) {
    try {
      await this.request.post(`api/setlists/update`, item)
      this.state.updateSet(item);
    } catch(err) {
      console.error(err)
    }
  }

  @action async browse() {
    this.state.setLists = await this.request.get(`api/setlists`)
  }
}
