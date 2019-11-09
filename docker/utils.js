const url = require('url')

const promisifyStream = (stream, handler) => new Promise((resolve, reject) => {
  stream.on('data', d => handler(d))
  stream.on('end', resolve)
  stream.on('error', reject)
})

const normalizeHost = host => {
  let dockerHost = url.parse(host)

  if (dockerHost.hostname) {
    dockerHost = { host: dockerHost.hostname, port: dockerHost.port, protocol: dockerHost.protocol }
  } else {
    dockerHost = { socketPath: '/var/run/docker.sock' }
  }

  return dockerHost
}

const normalizeArgs = args => {
  args.Image = args.image
  return args
}

const sortenID = id => {
  return id.substring(0, 12)
}

module.exports = {
  promisifyStream,
  normalizeHost,
  normalizeArgs,
  sortenID
}
