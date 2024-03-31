import { ICycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  STOP_CURRENT_CYCLE = 'STOP_CURRENT_CYCLE',
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
}

export const addNewCycleAction = (newCycle: ICycle) => {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export const stopCurrentCycleAction = () => {
  return {
    type: ActionTypes.STOP_CURRENT_CYCLE,
  }
}

export const finishCurrentCycleAction = () => {
  return {
    type: ActionTypes.FINISH_CURRENT_CYCLE,
  }
}
