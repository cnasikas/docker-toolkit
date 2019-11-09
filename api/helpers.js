const toPercentage = (a, b) => {
  return ((a / b) * 100).toFixed(2)
}

/* Adapted from https://github.com/moby/moby/blob/eb131c5383db8cac633919f82abad86c99bffbe5/cli/command/container/stats_helpers.go#L175 */
const calculateCPUPercentage = (cpu, prevCPU) => {
  let cpuPercent = 0.0

  const cpuDelta = cpu.cpu_usage.total_usage - prevCPU.cpu_usage.total_usage
  const systemDelta = cpu.system_cpu_usage - prevCPU.system_cpu_usage

  if (systemDelta > 0.0 && cpuDelta > 0.0) {
    cpuPercent = (cpuDelta / systemDelta) * cpu.cpu_usage.percpu_usage.length * 100.0
  }

  return cpuPercent.toFixed(2)
}

const calculateNetwork = network => {
  let rx = 0.0
  let tx = 0.0

  for (const adapter in network) {
    if (Object.prototype.hasOwnProperty.call(network, adapter)) {
      rx += network[adapter].rx_bytes
      tx += network[adapter].tx_bytes
    }
  }

  return { rx, tx }
}

/* Adapted from: https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string */
const sizeToHuman = (bytes, si = true) => {
  const thresh = si ? 1000 : 1024

  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  let u = -1

  do {
    bytes /= thresh
    ++u
  } while (Math.abs(bytes) >= thresh && u < units.length - 1)

  return `${bytes.toFixed(2)} ${units[u]}`
}

const formatStats = data => {
  try {
    const res = JSON.parse(data.toString())
    const network = calculateNetwork(res.networks)

    const stat = {
      id: res.id.substring(0, 12),
      name: res.name.substring(1),
      cpu: `${calculateCPUPercentage(res.cpu_stats, res.precpu_stats)}%`,
      mem_usage: sizeToHuman(res.memory_stats.usage),
      mem_limit: sizeToHuman(res.memory_stats.limit, false),
      mem_perc: `${toPercentage(res.memory_stats.usage, res.memory_stats.limit)}%`,
      net: `${sizeToHuman(network.rx)} / ${sizeToHuman(network.tx)}`
    }

    return stat
  } catch (err) {
    return {}
  }
}

const accumulateDataFromStream = stream => {
  return new Promise((resolve, reject) => {
    const buffer = []
    stream.on('data', chunk => buffer.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(buffer)))
    stream.on('error', reject)
  })
}

const disableCache = res => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
}

const getProgress = (args, data) => {
  try {
    let res = JSON.parse(data.toString())

    /* Filter undefined variables */
    res = args.map(arg => res[arg]).filter(item => item)
    return res.join(': ')
  } catch (err) {
    return ''
  }
}

const promisifyStream = stream => new Promise((resolve, reject) => {
  stream.on('end', resolve)
  stream.on('finish', resolve)
  stream.on('error', reject)
})

const registerToStream = (stream, cb) => {
  stream.on('data', chunk => cb(chunk))
}

module.exports = {
  formatStats,
  accumulateDataFromStream,
  disableCache,
  getProgress,
  promisifyStream,
  registerToStream
}
