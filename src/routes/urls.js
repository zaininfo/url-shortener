import Router from 'express-promise-router'
import shortid from 'shortid'

import { createUrl } from '../commands'
import { readUrl } from '../queries'
import log from '../logger'

const router = Router()

/* POST long url. */
router.post('/', async function (req, res, next) {
  const { url } = req.body

  if (!url) {
    log.error('URL is missing')
    res.status(400).end()
    return
  }

  const id = await createUrl({ longUrl: url })
  const shortUrl = `${req.protocol}://${req.hostname}/urls/${id}`

  res.render('url', { title: 'Shortened URL', url: shortUrl })
})

/* GET long url. */
router.get('/:urlId', async function (req, res, next) {
  const { urlId } = req.params

  if (!shortid.isValid(urlId)) {
    log.error('URL ID is invalid')
    res.status(400).end()
    return
  }

  const longUrl = await readUrl({ id: urlId })

  res.redirect(longUrl)
})

export default router
