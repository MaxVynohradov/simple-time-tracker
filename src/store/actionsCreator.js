import { GENERATE_TASK, START_TIMER, STOP_TIMER } from './types';

export const generateTask = () =>  ({ type: GENERATE_TASK })

export const startTask = (currentTask) =>  ({ type: START_TIMER, currentTask })

export const stopTask = (currentTask, tasks) =>  {
  return { type: STOP_TIMER, currentTask, tasks }
}
