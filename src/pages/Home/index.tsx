import { Play } from '@phosphor-icons/react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './style'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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

export function Home() {
  const { register, handleSubmit, watch, reset /* formState */ } =
    useForm<IFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmout: 0,
      },
    })

  async function handleTask(data: IFormData) {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleTask)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            {...register('task')}
            id="task"
            name="task"
            type="text"
            placeholder="De um nome para o seu projeto"
            list="task-suggestion"
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
            // max={60}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          Começar <Play size={24} />
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
