const generateDuration = () => 60 * 100 * Math.floor(Math.random() * 80 + 10)


const generateTasks = () => {
  const count = 15 - Math.ceil(Math.random() * 100) % 5
  let startTime = new Date().setHours(0, 0, 0, 0).valueOf();
  let endTime;
  return Array(count).fill(null).map((item, idx) => {
    startTime += generateDuration();
    const duration = generateDuration();
    endTime = startTime + duration;
    const task = {
      name: `Auto-generated task #${idx}`,
      startTime: new Date(startTime),
      duration,
      endTime: new Date(endTime),
    }
    startTime = endTime + generateDuration();
    return task
  })
}

export default generateTasks;