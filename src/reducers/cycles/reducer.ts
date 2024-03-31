import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stopDate?: Date
  finishedDate?: Date
}

interface ICycleDispatch {
  type: ActionTypes
  payload?: {
    newCycle: ICycle
  }
}

interface ICycleState {
  cycles: ICycle[]
  runningCycleId: string | null
}

export const cyclesReducer = (state: ICycleState, action: ICycleDispatch) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        if (!action.payload) return state
        draft.cycles.push(action.payload.newCycle)
        draft.runningCycleId = action.payload.newCycle.id
      })
    case ActionTypes.STOP_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.runningCycleId,
      )
      if (currentCycleIndex < 0) return state
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].stopDate = new Date()
        draft.runningCycleId = null
      })
    }
    case ActionTypes.FINISH_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.runningCycleId,
      )
      if (currentCycleIndex < 0) return state
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.runningCycleId = null
      })
    }
    default:
      return state
  }
}
