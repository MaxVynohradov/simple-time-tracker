/* eslint-disable no-bitwise */
const generateDuration = (highRange = 80) => 60 * 100 * Math.floor(Math.random() * highRange + 10);


const generateTasks = () => {
  const count = 15 - (Math.ceil(Math.random() * 100) % 5);
  const timeBetweenTasks = 1200;
  let startTime = new Date().setHours(0, 0, 0, 0).valueOf() + generateDuration(timeBetweenTasks);
  let endTime;
  return Array(count).fill(null).map(() => {
    startTime += generateDuration();
    const duration = generateDuration();
    endTime = startTime + duration;
    const id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
    const task = {
      id,
      name: `Auto-generated task #${id}`,
      startTime: new Date(startTime),
      duration,
      endTime: new Date(endTime),
    };
    startTime = endTime + generateDuration(timeBetweenTasks);
    return task;
  });
};

export default generateTasks;
