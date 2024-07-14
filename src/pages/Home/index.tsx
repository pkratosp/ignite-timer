import { HandPalm, Play } from '@phosphor-icons/react'
import {
  HomeContainer,
  StartCountDownButton,
  StropCountDownButton,
} from './style'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContext'

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmout: z
    .number()
    .min(5)
    .max(60, 'Deve ser passado no maximo o valor de 60 minutos'),
})

type IFormData = z.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { createNewCycle, interruptCycle, activeCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<IFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmout: 0,
    },
  })

  const { handleSubmit, watch, reset /* formState */ } = newCycleForm

  function handleCreateNewCycle(data: IFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <StropCountDownButton onClick={interruptCycle} type="button">
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
