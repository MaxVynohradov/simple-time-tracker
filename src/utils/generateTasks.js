const generateDuration = () => 60 * 100 * Math.floor(Math.random() * 80 + 10)


const generateTasks = () => {
  const count = 15 - Math.ceil(Math.random() * 100) % 5
  let startTime = new Date(new Date().setHours(0, 0, 0, 0));
  return Array(count).fill(null).map((item, idx) => {
    startTime += generateDuration();
    const duration = generateDuration();
    return {
      name: `Auto-generated task #${idx}`,
      startTime,
      duration,
      endTime: startTime + duration,
    }
  })
}

export default generateTasks;