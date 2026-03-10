import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type Mode = 'login' | 'register'

export default function Login() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  const errMap: Record<string, string> = {
    'Invalid login credentials': 'Неверный email или пароль',
    'Email not confirmed': 'Подтвердите email — проверьте почту',
    'User already registered': 'Этот email уже зарегистрирован',
    'Password should be at least 6 characters': 'Пароль минимум 6 символов',
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      if (!form.name.trim()) return setError('Введите имя')
      if (form.password !== form.confirm) return setError('Пароли не совпадают')
      if (form.password.length < 6) return setError('Пароль минимум 6 символов')
    }

    setLoading(true)
    const { error } = mode === 'login'
      ? await signIn(form.email, form.password)
      : await signUp(form.email, form.password, form.name)

    setLoading(false)

    if (error) {
      setError(errMap[error] || error)
    } else {
      if (mode === 'register') {
        setError('✓ Аккаунт создан! Войдите в систему.')
        setMode('login')
        setForm(p => ({ ...p, password: '', confirm: '', name: '' }))
      } else {
        navigate('/account')
      }
    }
  }

  return (
    <main className="pt-8 pb-24 min-h-[70vh]">
      <div className="border-b border-gray-light px-6 md:px-10 max-w-screen-2xl mx-auto pb-10">
        <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-2">Аккаунт</p>
        <h1 className="section-title">{mode === 'login' ? 'Войти' : 'Регистрация'}</h1>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 mt-12">
        {/* Toggle */}
        <div className="flex border-b border-gray-light mb-10 max-w-sm">
          {(['login', 'register'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError('') }}
              className={`font-body text-[11px] uppercase tracking-widest px-6 py-4 border-b-2 transition-all ${
                mode === m ? 'border-ink text-ink' : 'border-transparent text-gray-mid hover:text-graphite'
              }`}
            >
              {m === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="max-w-sm space-y-3">
          {mode === 'register' && (
            <div className="border border-gray-light">
              <div className="px-4 pt-2.5 pb-2">
                <label className="block font-body text-[9px] uppercase tracking-widest text-gray-mid mb-0.5">Имя</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Иван Иванов"
                  required
                  className="w-full bg-transparent font-body text-sm text-ink placeholder-gray-mid focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="border border-gray-light">
            <div className="px-4 pt-2.5 pb-2">
              <label className="block font-body text-[9px] uppercase tracking-widest text-gray-mid mb-0.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="ivan@mail.ru"
                required
                className="w-full bg-transparent font-body text-sm text-ink placeholder-gray-mid focus:outline-none"
              />
            </div>
          </div>

          <div className="border border-gray-light">
            <div className="px-4 pt-2.5 pb-2">
              <label className="block font-body text-[9px] uppercase tracking-widest text-gray-mid mb-0.5">Пароль</label>
              <input
                type="password"
                value={form.password}
                onChange={set('password')}
                placeholder="Минимум 6 символов"
                required
                className="w-full bg-transparent font-body text-sm text-ink placeholder-gray-mid focus:outline-none"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="border border-gray-light">
              <div className="px-4 pt-2.5 pb-2">
                <label className="block font-body text-[9px] uppercase tracking-widest text-gray-mid mb-0.5">Повторите пароль</label>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={set('confirm')}
                  placeholder="Повторите пароль"
                  required
                  className="w-full bg-transparent font-body text-sm text-ink placeholder-gray-mid focus:outline-none"
                />
              </div>
            </div>
          )}

          {error && (
            <p className={`font-body text-xs py-2 ${error.startsWith('✓') ? 'text-green-600' : 'text-red-500'}`}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-center mt-4 disabled:opacity-50"
          >
            {loading ? 'Подождите...' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </button>

          {mode === 'login' && (
            <p className="font-body text-xs text-gray-mid text-center pt-2">
              Нет аккаунта?{' '}
              <button type="button" onClick={() => setMode('register')} className="text-ink underline">
                Зарегистрироваться
              </button>
            </p>
          )}
        </form>
      </div>
    </main>
  )
}
