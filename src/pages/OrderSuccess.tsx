import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

type Status = 'checking' | 'succeeded' | 'pending' | 'canceled' | 'error'

export default function OrderSuccess() {
  const [params] = useSearchParams()
  const orderId = params.get('id') || ''
  const paymentId = params.get('paymentId') || ''
  const [status, setStatus] = useState<Status>('checking')

  useEffect(() => {
    if (!paymentId) {
      setStatus('succeeded') // fallback если нет paymentId
      return
    }
    // Проверяем статус платежа
    fetch(`/api/payment-status?paymentId=${paymentId}`)
      .then(r => r.json())
      .then(data => {
        if (data.paid || data.status === 'succeeded') setStatus('succeeded')
        else if (data.status === 'canceled') setStatus('canceled')
        else setStatus('pending')
      })
      .catch(() => setStatus('succeeded')) // если нет API — показываем успех
  }, [paymentId])

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full text-center">

        {status === 'checking' && (
          <>
            <div className="w-12 h-12 border border-gray-mid border-t-ink rounded-full animate-spin mx-auto mb-8" />
            <h1 className="font-display text-3xl font-light mb-3">Проверяем оплату...</h1>
            <p className="font-body text-sm text-gray-mid">Секунду, получаем подтверждение</p>
          </>
        )}

        {status === 'succeeded' && (
          <>
            <div className="w-16 h-16 bg-ink rounded-full flex items-center justify-center mx-auto mb-8">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-3">Оплата прошла</p>
            <h1 className="font-display text-4xl font-light mb-4">Спасибо за заказ!</h1>
            {orderId && (
              <p className="font-body text-sm text-graphite mb-2">Заказ <strong>{orderId}</strong></p>
            )}
            <p className="font-body text-sm text-gray-mid mb-10 max-w-xs mx-auto">
              Мы уже получили ваш заказ и скоро свяжемся для уточнения деталей доставки
            </p>
            <Link to="/" className="btn-primary">Вернуться на главную</Link>
          </>
        )}

        {status === 'pending' && (
          <>
            <div className="w-16 h-16 border-2 border-amber-400 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-2xl">⏳</span>
            </div>
            <h1 className="font-display text-3xl font-light mb-4">Ожидаем оплату</h1>
            <p className="font-body text-sm text-gray-mid mb-8">
              Платёж обрабатывается. Обычно это занимает несколько минут.
            </p>
            <Link to="/" className="btn-outline">На главную</Link>
          </>
        )}

        {status === 'canceled' && (
          <>
            <div className="w-16 h-16 border-2 border-red-300 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
            <h1 className="font-display text-3xl font-light mb-4">Оплата отменена</h1>
            <p className="font-body text-sm text-gray-mid mb-8">
              Платёж был отменён. Попробуйте оформить заказ снова.
            </p>
            <Link to="/checkout" className="btn-primary">Попробовать снова</Link>
          </>
        )}

      </div>
    </main>
  )
}
