import { differenceInSeconds } from 'date-fns'
import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addNewCycleAction,
  finishCurrentCycleAction,
  stopCurrentCycleAction,
} from '../reducers/cycles/actions'
import { ICycle, cyclesReducer } from '../reducers/cycles/reducer'

interface ICycleData {
  task: string
  minutesAmount: number
}
interface ICyclesContext {
  cycles: ICycle[]
  runningCycle: ICycle | undefined
  runningCycleId: string | null
  amountSecondsPast: number
  setCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: ICycleData) => void
  stopCurrentCycle: () => void
}

export const CyclesContext = createContext({} as ICyclesContext)

interface ICyclesContextProvider {
  children: ReactNode
}

export const CyclesContextProvider = ({ children }: ICyclesContextProvider) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      runningCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )
      if (storedStateAsJSON) return JSON.parse(storedStateAsJSON)
      return initialState
    },
  )
  const { cycles, runningCycleId } = cyclesState
  const runningCycle = cycles.find((cycle) => cycle.id === runningCycleId)

  const [amountSecondsPast, setAmountSecondsPast] = useState(() => {
    if (runningCycle) {
      const diffSeconds = differenceInSeconds(
        new Date(),
        new Date(runningCycle.startDate),
      )
      return diffSeconds
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  const setCurrentCycleAsFinished = () => {
    dispatch(finishCurrentCycleAction())
  }

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPast(seconds)
  }

  const createNewCycle = (data: ICycleData) => {
    const newCycle: ICycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPast(0)
  }

  const stopCurrentCycle = () => {
    dispatch(stopCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        runningCycle,
        runningCycleId,
        amountSecondsPast,
        setCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        stopCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
