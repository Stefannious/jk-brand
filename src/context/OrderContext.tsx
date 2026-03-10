import { createContext, useContext, useState, ReactNode } from 'react'

export interface OrderForm {
  email: string
  name: string
  phone: string
  city: string
  address: string
  comment: string
  payment: 'card' | 'sbp' | 'cash'
  delivery: 'courier' | 'pickup' | 'post'
}

interface OrderContextValue {
  form: OrderForm
  setField: <K extends keyof OrderForm>(key: K, val: OrderForm[K]) => void
  step: number
  setStep: (n: number) => void
  isSuccess: boolean
  setSuccess: (b: boolean) => void
}

const defaultForm: OrderForm = {
  email: '',
  name: '',
  phone: '',
  city: '',
  address: '',
  comment: '',
  payment: 'card',
  delivery: 'courier',
}

const OrderContext = createContext<OrderContextValue | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<OrderForm>(defaultForm)
  const [step, setStep] = useState(1)
  const [isSuccess, setSuccess] = useState(false)

  const setField = <K extends keyof OrderForm>(key: K, val: OrderForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }))
  }

  return (
    <OrderContext.Provider value={{ form, setField, step, setStep, isSuccess, setSuccess }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be inside OrderProvider')
  return ctx
}
