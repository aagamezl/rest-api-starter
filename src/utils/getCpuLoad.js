import os from 'os'

// Create function to get CPU information
const cpuAverage = () => {
  // Initialise sum of idle and time of cores and fetch CPU info
  let totalIdle = 0
  let totalTick = 0
  const cpus = os.cpus()

  // Loop through CPU cores
  for (let index = 0, length = cpus.length; index < length; index++) {
    // Select CPU core
    const cpu = cpus[index]

    // Total up the time in the cores tick
    for (const type in cpu.times) {
      totalTick += cpu.times[type]
    }

    // Total up the idle time of the core
    totalIdle += cpu.times.idle
  }

  // Return the average Idle and Tick times
  return { idle: totalIdle / cpus.length, total: totalTick / cpus.length }
}

// function to calculate average of array
const arrAvg = (arr) => {
  if (arr && arr.length >= 1) {
    const sumArr = arr.reduce((a, b) => a + b, 0)
    return sumArr / arr.length
  }
}

// load average for the past 1000 milliseconds calculated every 100
export const getCpuLoad = (avgTime = 1000, delay = 100) => {
  return new Promise((resolve, reject) => {
    const n = ~~(avgTime / delay)

    if (n <= 1) {
      reject(new Error('Interval is too small'))
    }

    let index = 0
    const samples = []
    const initialAvg = cpuAverage()

    const interval = setInterval(() => {
      if (index >= n) {
        clearInterval(interval)
        return resolve(~~((arrAvg(samples) * 100)))
      }

      const finalAvg = cpuAverage()
      const totalDiff = finalAvg.total - initialAvg.total
      const idleDiff = finalAvg.idle - initialAvg.idle

      samples[index] = (1 - idleDiff / totalDiff)

      index++
    }, delay)
  })
}
