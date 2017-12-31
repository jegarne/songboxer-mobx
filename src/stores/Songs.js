import {action} from 'mobx'

export default class Songs {

  constructor(request, state) {
    this.request = request
    this.state = state
  }

  @action async add(title) {
    const result = await this.request.post(`api/songs/add`, { title })
    this.state.songs.push(result)
  }

  @action async remove(item) {
    try {
      await this.request.post(`api/songs/remove`, { id: item.id })
      this.state.songs.remove(item)
    } catch(err) {
      console.error(err)
    }
  }

  @action async update(item) {
    try {
      await this.request.post(`api/songs/update`, item)
      this.state.updateSong(item)
    } catch(err) {
      console.error(err)
    }
  }

  @action async browse() {
    this.state.songs = await this.request.get(`api/songs`)
  }
}
