import Router from 'koa-router'
import authorize from './middleware/authorize'
import * as account from './routes/account'
import * as setlists from './routes/setlists'
import * as sets from './routes/sets'
import * as songs from './routes/songs'

const router = new Router()

router.get('/api/account/logout', account.logout)
router.post('/api/account/login', account.login)
router.post('/api/account/register', account.register)

router.get('/api/setlists', setlists.getSetLists)
router.post('/api/setlists/add', setlists.addSetList)
router.post('/api/setlists/remove', authorize, setlists.removeSetList)

router.get('/api/sets', sets.getSets)
router.post('/api/sets/add', sets.addSet)
router.post('/api/sets/remove', authorize, sets.removeSet)

router.get('/api/songs', songs.getSongs)
router.post('/api/songs/add', songs.addSong)
router.post('/api/songs/remove', authorize, songs.removeSong)

export default router
