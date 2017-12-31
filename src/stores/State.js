import { extendObservable, toJS } from 'mobx'

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

    this.getSet = (id) => {
      this.sets.forEach((set) => {
        if(set.id === id) {
          return set;
        }
      });
    }
    
    this.updateSet = (set) => {
      this.sets.forEach((set) => {
        if(set.id === item.id) {
          set = item;
        }
      });
    }

    this.getSong = (id) => {
      this.songs.forEach((song) => {
        if(song.id === id) {
          return song;
        }
      });
    }

    this.updateSong = (song) => {
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
