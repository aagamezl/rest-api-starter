import os from 'os'

// Create function to get CPU information
const cpuAverage = () => {
  // Initialise sum of idle and time of cores and fetch CPU info
  let totalIdle = 0
  let totalTick = 0
  const cpus = os.cpus()

  // Loop through CPU cores
  for (let i = 0, length = cpus.length; i < length; i++) {
    // Select CPU core
    const cpu = cpus[i]

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
      reject(new Error('Error: interval to small'))
    }

    let index = 0
    const samples = []
    const avg1 = cpuAverage()

    const interval = setInterval(() => {
      if (index >= n) {
        clearInterval(interval)
        return resolve(~~((arrAvg(samples) * 100)))
      }

      const avg2 = cpuAverage()
      const totalDiff = avg2.total - avg1.total
      const idleDiff = avg2.idle - avg1.idle

      samples[index] = (1 - idleDiff / totalDiff)

      index++
    }, delay)
  })
}
