import { Url } from '../db'

export default async function ({ id }) {
  const url = await Url.findById(id)

  return url.url
}
