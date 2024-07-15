import { Cycle } from './reducer'

export enum ActionsType {
  ADDNEWCYCLE = 'ADDNEWCYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionsType.ADDNEWCYCLE,
    payload: {
      newCycle,
    },
  }
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionsType.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

export function interruptCUrrentCycleAction() {
  return {
    type: ActionsType.INTERRUPT_CURRENT_CYCLE,
  }
}
