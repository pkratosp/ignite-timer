import { FormContainer, MinutesAmountInput, TaskInput } from './style'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CycleContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)

  const { register } = useFormContext()

  return (
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
  )
}
