import { createContext, ReactNode, useReducer, useState } from 'react'
import { Cycle, CyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCUrrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
type IFormData = {
  minutesAmout: number
  task: string
}

interface ICyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassad: (seconds: number) => void
  createNewCycle: (data: IFormData) => void
  interruptCycle: () => void
}

export const CyclesContext = createContext({} as ICyclesContextType)

interface Props {
  children: ReactNode
}

export function CyclesContextProvider({ children }: Props) {
  const [cyclesState, dispatch] = useReducer(CyclesReducer, {
    cycles: [],
    activeCycleId: '',
  })
  const { cycles, activeCycleId } = cyclesState

  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassad(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction)
  }

  async function createNewCycle(data: IFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      minutesAmout: data.minutesAmout,
      task: data.task,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCycle() {
    dispatch(interruptCUrrentCycleAction)
  }
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassad,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
