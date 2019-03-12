import shortid from 'shortid'

import { Url } from '../db'

export default async function ({ longUrl }) {
  const id = shortid.generate()

  await Url.create({
    id,
    url: longUrl
  })

  return id
}
