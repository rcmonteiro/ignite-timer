import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountDownContainer, Separator } from './styles'

export const CountDown = () => {
  const {
    runningCycle,
    runningCycleId,
    amountSecondsPast,
    setCurrentCycleAsFinished,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = runningCycle ? runningCycle.minutesAmount * 60 : 0
  const currentSeconds = runningCycle ? totalSeconds - amountSecondsPast : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (runningCycle) document.title = `${minutes}:${seconds}`
  }, [minutes, seconds, runningCycle])

  useEffect(() => {
    let interval: number
    if (runningCycle) {
      interval = setInterval(() => {
        const diffSeconds = differenceInSeconds(
          new Date(),
          new Date(runningCycle.startDate),
        )
        if (diffSeconds >= totalSeconds) {
          setCurrentCycleAsFinished()
          clearInterval(interval)
          setSecondsPassed(totalSeconds)
        } else {
          setSecondsPassed(diffSeconds)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    runningCycle,
    totalSeconds,
    runningCycleId,
    setCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
