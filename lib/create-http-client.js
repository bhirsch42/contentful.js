/* @flow */
import qs from 'querystring'
import packageFile from '../package.json'

type HttpClientParams = {
  space: string,
  accessToken: string,
  insecure?: boolean,
  host?: string,
  agent?: Object,
  headers?: Object
}

/**
 * @private
 * Create pre configured axios instance
 */
export default function createHttpClient (axios: Object, {space, accessToken, insecure, host, agent, headers}: HttpClientParams): Object {
  let [hostname, port] = (host && host.split(':')) || []
  hostname = hostname || 'cdn.contentful.com'
  port = port || (insecure ? 80 : 443)
  headers = headers || {}
  headers['Content-Type'] = 'application/vnd.contentful.delivery.v1+json'
  headers['X-Contentful-User-Agent'] = 'contentful.js/' + packageFile.version

  return axios.create({
    baseURL: `${insecure ? 'http' : 'https'}://${hostname}:${port}/spaces/${space}/`,
    headers: headers,
    agent: agent,
    params: {
      access_token: accessToken
    },
    paramsSerializer: params => qs.stringify(params)
  })
}