import { HandPalm, Play } from '@phosphor-icons/react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  StropCountDownButton,
  TaskInput,
} from './style'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

// interface IFormData {
//   task: string
//   minutesAmout: number
// }

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmout: z
    .number()
    .min(5)
    .max(60, 'Deve ser passado no maximo o valor de 60 minutos'),
})

type IFormData = z.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmout: number
  startDate: Date
  interuptDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const { register, handleSubmit, watch, reset /* formState */ } =
    useForm<IFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmout: 0,
      },
    })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutesAmout * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          setAmountSecondsPassed(0)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  async function handleCreateNewCycle(data: IFormData) {
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

    reset()
  }

  function handleInterruptCycle() {
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

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmonut = Math.floor(currentSeconds / 60)
  const secondsAmonut = currentSeconds % 60

  const minutes = String(minutesAmonut).padStart(2, '0')
  const seconds = String(secondsAmonut).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            {...register('task')}
            id="task"
            name="task"
            type="text"
            placeholder="De um nome para o seu projeto"
            list="task-suggestion"
            disabled={!!activeCycle}
          />

          <datalist id="task-suggestion">
            <option value="projeto 1" />
            <option value="projeto 2" />
            <option value="projeto 3" />
            <option value="macarrao" />
          </datalist>

          <label htmlFor="minutes">Durante</label>
          <MinutesAmountInput
            {...register('minutesAmout', { valueAsNumber: true })}
            type="number"
            name="minutesAmout"
            id="minutesAmout"
            placeholder="00"
            step={5}
            min={5}
            disabled={!!activeCycle}
            // max={60}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StropCountDownButton onClick={handleInterruptCycle} type="button">
            Parar <HandPalm size={24} />
          </StropCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            Começar <Play size={24} />
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
