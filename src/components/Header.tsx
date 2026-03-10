import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useSearch } from '../context/SearchContext'
import { useAuth } from '../context/AuthContext'
import { products } from '../data/products'

const navItems = [
  {
    label: 'Каталог',
    href: '/catalog',
    mega: {
      cols: [
        { title: 'Куртки', links: ['Бомбер Чёрный', 'Бомбер Бежевый', 'Бомбер Серый'] },
        { title: 'Свитшоты', links: ['Свитшот Чёрный', 'Свитшот Молочный', 'Свитшот Серый'] },
        { title: 'Новинки', links: ['Все новинки', 'Популярное'] },
      ],
      image: '/bomber-beige-3.jpg',
      imageCaption: 'Новая коллекция',
    },
  },
  { label: 'Мужчинам', href: '/catalog?cat=jackets' },
  { label: 'Концепция', href: '/concept' },
  { label: 'Поддержка', href: '/support' },
]

export default function Header() {
  const { totalCount, openCart } = useCart()
  const { count: wishCount } = useWishlist()
  const { open: openSearch } = useSearch()
  const { user } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const [announcementVisible, setAnnouncementVisible] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const megaRef = useRef<HTMLDivElement>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMega(null)
  }, [location])

  const handleMouseEnter = (label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setActiveMega(label)
  }
  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveMega(null), 120)
  }

  const megaItem = navItems.find(n => n.label === activeMega && n.mega)

  return (
    <>
      {/* Announcement bar */}
      {announcementVisible && (
        <div className="bg-ink text-cream py-2.5 px-6 flex items-center justify-center relative">
          <p className="font-body text-[10px] uppercase tracking-widest text-center">
            Бесплатная доставка по Москве от 5 000 ₽ &nbsp;·&nbsp; Возврат 30 дней
          </p>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-4 text-cream/50 hover:text-cream transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Main header */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-cream'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Left nav */}
            <nav className="hidden lg:flex items-center gap-8 flex-1">
              {navItems.slice(0, 2).map(item => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.mega ? handleMouseEnter(item.label) : undefined}
                  onMouseLeave={item.mega ? handleMouseLeave : undefined}
                >
                  <Link
                    to={item.href}
                    className={`nav-link flex items-center gap-1 ${activeMega === item.label ? 'text-ink' : ''}`}
                  >
                    {item.label}
                    {item.mega && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className={`transition-transform duration-200 ${activeMega === item.label ? 'rotate-180' : ''}`}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-1 flex flex-col gap-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              <span className={`block h-px w-5 bg-ink transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px w-5 bg-ink transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-5 bg-ink transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {/* Logo — center */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 z-10">
              <img src="/logo.jpg" alt="JK" className="h-9 md:h-11 w-auto" />
            </Link>

            {/* Right nav */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-end">
              {navItems.slice(2).map(item => (
                <Link key={item.label} to={item.href} className="nav-link">{item.label}</Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4 ml-6">
              {/* Search */}
              <button onClick={openSearch} className="p-1 text-graphite hover:text-ink transition-colors" aria-label="Поиск">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              {/* Account */}
              <button onClick={() => navigate(user ? '/account' : '/login')} className="p-1 text-graphite hover:text-ink transition-colors hidden md:block" aria-label="Аккаунт">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {/* Wishlist */}
              <button onClick={() => navigate('/wishlist')} className="relative p-1 text-graphite hover:text-ink transition-colors" aria-label="Избранное">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-ink text-cream text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {wishCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button onClick={openCart} className="relative p-1 text-graphite hover:text-ink transition-colors" aria-label="Корзина">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-ink text-cream text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="border-b border-gray-light" />

        {/* Mega menu */}
        {megaItem?.mega && (
          <div
            ref={megaRef}
            className="absolute left-0 right-0 bg-cream border-b border-gray-light shadow-lg z-40 animate-fade-in"
            onMouseEnter={() => { if (leaveTimer.current) clearTimeout(leaveTimer.current) }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-screen-xl mx-auto px-10 py-10 grid grid-cols-4 gap-8">
              {megaItem.mega.cols.map(col => (
                <div key={col.title}>
                  <h4 className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-4">{col.title}</h4>
                  <ul className="space-y-2.5">
                    {col.links.map(link => (
                      <li key={link}>
                        <Link
                          to={`/catalog`}
                          className="font-display text-base font-light text-ink hover:text-graphite transition-colors"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {/* Image column */}
              <div className="relative overflow-hidden group cursor-pointer" onClick={() => navigate('/catalog')}>
                <img
                  src={megaItem.mega.image}
                  alt={megaItem.mega.imageCaption}
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <p className="font-display text-sm italic mt-2 text-graphite">{megaItem.mega.imageCaption}</p>
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-400 bg-cream border-t border-gray-light ${mobileOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <nav className="px-6 py-4 space-y-0">
            {navItems.map(item => (
              <Link key={item.label} to={item.href}
                className="block font-body text-sm py-3.5 border-b border-gray-light text-ink tracking-wide">
                {item.label}
              </Link>
            ))}
            <Link to="/wishlist" className="block font-body text-sm py-3.5 border-b border-gray-light text-ink tracking-wide">
              Избранное {wishCount > 0 && `(${wishCount})`}
            </Link>
            <Link to="/account" className="block font-body text-sm py-3.5 text-ink tracking-wide">
              Мой аккаунт
            </Link>
          </nav>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay />
    </>
  )
}

function SearchOverlay() {
  const { isOpen, close, query, setQuery } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100)
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  const results = query.trim().length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex flex-col" onClick={close}>
      <div className="bg-cream border-b border-gray-light px-6 md:px-10 py-6" onClick={e => e.stopPropagation()}>
        <div className="max-w-screen-md mx-auto">
          <div className="flex items-center gap-4 border-b-2 border-ink pb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-graphite flex-shrink-0">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Поиск товаров..."
              className="flex-1 bg-transparent font-display text-2xl font-light text-ink placeholder-gray-mid focus:outline-none"
            />
            <button onClick={close} className="text-graphite hover:text-ink transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {results.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.map(p => (
                <div key={p.id} className="cursor-pointer group" onClick={() => { close(); navigate(`/product/${p.id}`) }}>
                  <img src={p.images[0]} alt={p.name} className="w-full aspect-square object-cover bg-gray-light mb-2 group-hover:opacity-80 transition-opacity" />
                  <p className="font-display text-sm font-light">{p.name}</p>
                  <p className="font-body text-xs text-gray-mid">
                    {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(p.price)}
                  </p>
                </div>
              ))}
            </div>
          ) : query.trim().length > 1 ? (
            <p className="mt-6 font-body text-sm text-gray-mid">По запросу «{query}» ничего не найдено</p>
          ) : (
            <div className="mt-6">
              <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-3">Популярные запросы</p>
              <div className="flex flex-wrap gap-2">
                {['Бомбер', 'Свитшот', 'Чёрный', 'Новинки'].map(tag => (
                  <button key={tag} onClick={() => setQuery(tag)}
                    className="border border-gray-mid px-4 py-1.5 font-body text-sm text-graphite hover:border-ink hover:text-ink transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 bg-ink/20 backdrop-blur-sm" />
    </div>
  )
}
