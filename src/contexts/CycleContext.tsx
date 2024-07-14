import { createContext, ReactNode, useState } from 'react'

type IFormData = {
  minutesAmout: number
  task: string
}

interface Cycle {
  id: string
  task: string
  minutesAmout: number
  startDate: Date
  interuptDate?: Date
  finishedDate?: Date
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
  const [cycles, setCycles] = useState<Cycle[]>([])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassad(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  async function createNewCycle(data: IFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      minutesAmout: data.minutesAmout,
      task: data.task,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])

    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interuptDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
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
