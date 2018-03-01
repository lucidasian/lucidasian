import config from './config'
// Require '/'
export default function apiURL(reqURL) {
    return (`http://${config.serverHostname}:${config.serverPort}/api` + reqURL)
}