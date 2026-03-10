import { useState } from 'react'
import { Link } from 'react-router-dom'

const cols = [
  {
    title: 'Каталог',
    links: [
      { label: 'Все товары', to: '/catalog' },
      { label: 'Куртки', to: '/catalog?cat=jackets' },
      { label: 'Свитшоты', to: '/catalog?cat=sweatshirts' },
      { label: 'Новинки', to: '/catalog?new=1' },
      { label: 'Популярное', to: '/catalog?popular=1' },
    ],
  },
  {
    title: 'О бренде',
    links: [
      { label: 'Концепция', to: '/concept' },
      { label: 'Трансформация', to: '/concept' },
      { label: 'Производство', to: '/concept' },
      { label: 'Пресса', to: '/support' },
    ],
  },
  {
    title: 'Сервис',
    links: [
      { label: 'Поддержка', to: '/support' },
      { label: 'Доставка и возврат', to: '/support' },
      { label: 'Таблица размеров', to: '/support' },
      { label: 'Уход за вещами', to: '/support' },
      { label: 'Мой аккаунт', to: '/account' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (email.includes('@')) { setSubscribed(true) }
  }

  return (
    <footer className="bg-ink text-cream mt-20">

      {/* Newsletter */}
      <div className="border-b border-cream/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-display text-3xl font-light mb-2">Будьте в курсе</h3>
            <p className="font-body text-sm text-cream/50">Новые коллекции, эксклюзивные предложения и истории бренда</p>
          </div>
          {subscribed ? (
            <p className="font-body text-sm text-cream/60 flex items-center gap-2">
              <span className="text-lg">✓</span> Вы успешно подписались
            </p>
          ) : (
            <div className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Ваш email"
                className="flex-1 bg-transparent border border-cream/20 px-4 py-3 font-body text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-cream/50 transition-colors"
              />
              <button
                onClick={handleSubscribe}
                className="bg-cream text-ink font-body text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-gray-light transition-colors"
              >
                Подписаться
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand col */}
          <div>
            <img src="/logo.jpg" alt="JK" className="h-10 w-auto mb-5 brightness-0 invert opacity-80" />
            <p className="font-display text-base italic text-cream/40 leading-relaxed">
              One Piece.<br />Endless Forms.
            </p>
            <div className="flex gap-4 mt-6">
              {['IG', 'TG', 'VK'].map(s => (
                <button key={s} className="font-body text-[10px] tracking-wider text-cream/40 hover:text-cream transition-colors border border-cream/20 px-2.5 py-1 hover:border-cream/50">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <h4 className="font-body text-[10px] uppercase tracking-widest text-cream/30 mb-5">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="font-body text-sm text-cream/60 hover:text-cream transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-cream/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-6">
            <p className="font-body text-xs text-cream/25">© {new Date().getFullYear()} JK. Все права защищены.</p>
            <a href="mailto:Jjjako@mail.ru" className="font-body text-xs text-cream/40 hover:text-cream/70 transition-colors">
              Jjjako@mail.ru
            </a>
            <a href="tel:+79256337619" className="font-body text-xs text-cream/40 hover:text-cream/70 transition-colors">
              +7 (925) 633-76-19
            </a>
          </div>
          <div className="flex gap-4">
            {['Политика конфиденциальности', 'Оферта'].map((t, i) => (
              <Link key={t} to={i === 0 ? '/privacy' : '/oferta'} className="font-body text-[10px] text-cream/25 hover:text-cream/50 transition-colors">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
