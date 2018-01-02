import { extendObservable, toJS } from 'mobx'
import { getVideoId } from 'get-video-id'

/**
 * This is our state, we update it
 * using the methods from other stores
 */
class State {
  constructor(state) {
    extendObservable(this, {
      account: {
        username: null,
        token: null,
        users: []
      },
      common: {
        title: 'Mobx-starter',
        statusCode: 200,
        hostname: 'localhost'
      },
      setLists:[],
      sets:[],
      songs:[]

    }, state)

    this.getVideoId = (url) => {
      return getVideoId(url)
    }

    this.getSet = (id) => {
      return this.sets.find(s => s.id === id);
    }

    this.updateSet = (set) => {
      this.sets.forEach((set) => {
        if(set.id === item.id) {
          set = item;
        }
      });
    }

    this.getSong = (id) => {
      return this.songs.find(s => s.id === id);
    }

    this.updateSong = (item) => {
      this.songs.forEach((song) => {
        if(song.id === item.id) {
          song = item;
        }
      });
    }

  } // end constructor
}

export default process.env.BROWSER ? (
  window.__STATE = new State(window.__STATE)
) : new State({})
