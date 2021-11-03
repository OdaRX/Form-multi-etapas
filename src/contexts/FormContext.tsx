//Context, Reducer, useContext, Hook

import { createContext, useContext, useReducer } from 'react'

type State = {
  currentStep: number
  name: string
  level: 0 | 1
  email: string
  github: string
}

type Action = {
  type: FormAcions
  payload: any
}

type ContextType = {
  state: State
  dispatch: (action: Action) => void
}

type FormProviderProps = {
  children: React.ReactNode
}

const initialData: State = {
  currentStep: 0,
  name: '',
  level: 0,
  email: '',
  github: ''
}

// Context

const FormContext = createContext<ContextType | undefined>(undefined)

// Reducer
export enum FormAcions {
  setCurrentStep,
  setName,
  setLevel,
  setEmail,
  setGithub
}
const formReducer = (state: State, action: Action) => {
  switch (action.type) {
    case FormAcions.setCurrentStep:
      return { ...state, currentStep: action.payload }
    case FormAcions.setName:
      return { ...state, name: action.payload }
    case FormAcions.setLevel:
      return { ...state, level: action.payload }
    case FormAcions.setEmail:
      return { ...state, email: action.payload }
    case FormAcions.setGithub:
      return { ...state, github: action.payload }
    default:
      return state
  }
}

// Provider

export const FormProvider = ({ children }: FormProviderProps) => {
  const [state, dispatch] = useReducer(formReducer, initialData)
  const value = { state, dispatch }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

// Context Hook

export const useForm = () => {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useForm precisa ser usasado dentro do FormProvider')
  }
  return context
}