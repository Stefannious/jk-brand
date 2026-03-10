import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products, getNewProducts, getPopularProducts } from '../data/products'

function Marquee() {
  const text = 'ONE PIECE · ENDLESS FORMS · JK BRAND · ТРАНСФОРМИРУЕМАЯ ОДЕЖДА · '
  return (
    <div className="bg-ink text-cream py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[text, text, text, text].map((t, i) => (
          <span key={i} className="font-body text-[11px] uppercase tracking-widest mx-0">{t}</span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const newProducts = getNewProducts()
  const popularProducts = getPopularProducts()
  const navigate = useNavigate()

  return (
    <main>

      {/* Hero */}
      <section className="relative w-full h-[92vh] min-h-[560px] overflow-hidden">
        <img src="/hero.jpg" alt="JK" className="absolute inset-0 w-full h-full object-cover object-center" style={{ filter: 'brightness(0.88) contrast(1.05) saturate(0.9)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/15 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 pb-16 md:pb-24 px-8 md:px-16">
          <p className="font-body text-[10px] uppercase tracking-widest text-cream/60 mb-4 animate-fade-up" style={{ opacity: 0, animationDelay: '0.1s' }}>
            Новая коллекция 2025
          </p>
          <h1 className="font-display text-7xl md:text-9xl font-light text-cream leading-none mb-3 animate-fade-up" style={{ opacity: 0, animationDelay: '0.25s' }}>
            JK
          </h1>
          <p className="font-display text-xl md:text-2xl font-light italic text-cream/75 mb-10 animate-fade-up" style={{ opacity: 0, animationDelay: '0.4s' }}>
            One Piece. Endless Forms.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ opacity: 0, animationDelay: '0.55s' }}>
            <Link to="/catalog" className="bg-cream text-ink font-body text-[11px] uppercase tracking-widest px-10 py-4 hover:bg-gray-light transition-colors">
              Смотреть каталог
            </Link>
            <Link to="/concept" className="border border-cream text-cream font-body text-[11px] uppercase tracking-widest px-10 py-4 hover:bg-cream/10 transition-colors">
              О концепции
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2 opacity-30">
          <div className="h-12 w-px bg-cream animate-shimmer" />
          <span className="font-body text-[9px] tracking-widest text-cream">SCROLL</span>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* New Arrivals */}
      <section className="py-20 md:py-28 px-6 md:px-10 max-w-screen-2xl mx-auto">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-2">Свежее</p>
            <h2 className="section-title">Новые поступления</h2>
          </div>
          <Link to="/catalog" className="hidden md:flex items-center gap-2 font-body text-[11px] uppercase tracking-widest text-graphite hover:text-ink transition-colors border-b border-graphite pb-0.5">
            Все товары
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Editorial split — concept */}
      <section className="bg-graphite text-cream">
        <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 min-h-[520px]">
          {/* Text */}
          <div className="flex flex-col justify-center px-10 md:px-16 py-20">
            <p className="font-body text-[10px] uppercase tracking-widest text-cream/35 mb-6">Концепция бренда</p>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-8">
              Одна вещь —<br /><em>бесконечно</em><br />форм
            </h2>
            <p className="font-body text-sm text-cream/55 leading-relaxed max-w-sm mb-10">
              Каждое изделие JK — это система. Рукава крепятся на кнопках,
              капюшон снимается, слои разделяются. Один предмет гардероба
              становится двумя, тремя и даже четырьмя разными образами.
            </p>
            <div className="space-y-0 mb-10 border-t border-cream/10 max-w-sm">
              {[
                ['↻', 'Снимите рукава', 'Куртка → жилет'],
                ['◈', 'Снимите капюшон', 'Меняйте силуэт'],
              ].map(([icon, title, desc]) => (
                <div key={title} className="flex gap-4 py-4 border-b border-cream/10">
                  <span className="text-cream/25 text-lg w-6 flex-shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="font-body text-[11px] uppercase tracking-wider text-cream/70">{title}</p>
                    <p className="font-body text-xs text-cream/35 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/concept" className="btn-primary bg-cream text-ink hover:bg-gray-light self-start">
              Узнать больше
            </Link>
          </div>
          {/* Image */}
          <div className="relative overflow-hidden min-h-[400px]">
            <img
              src="/bomber-beige-3.jpg"
              alt="Концепция JK"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Popular */}
      <section className="py-20 md:py-28 px-6 md:px-10 max-w-screen-2xl mx-auto">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-2">Хиты продаж</p>
            <h2 className="section-title">Популярное</h2>
          </div>
          <Link to="/catalog" className="hidden md:flex items-center gap-2 font-body text-[11px] uppercase tracking-widest text-graphite hover:text-ink transition-colors border-b border-graphite pb-0.5">
            Весь каталог
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {popularProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* 2-col editorial */}
      <section className="px-6 md:px-10 max-w-screen-2xl mx-auto pb-20">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {[
            {
              title: 'Бомберы',
              sub: 'Рукава и капюшон на кнопках',
              img: '/bomber-beige-3.jpg',
              to: '/catalog?cat=jackets',
            },
            {
              title: 'Свитшоты',
              sub: 'Рукава на кнопках → футболка',
              img: '/sweat-black-1.jpg',
              to: '/catalog?cat=sweatshirts',
            },
          ].map(item => (
            <Link key={item.title} to={item.to} className="group relative overflow-hidden aspect-[4/3] block">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-body text-[10px] uppercase tracking-widest text-cream/60 mb-1">{item.sub}</p>
                <h3 className="font-display text-3xl font-light text-cream">{item.title}</h3>
                <span className="inline-block font-body text-[10px] uppercase tracking-widest text-cream border-b border-cream pb-0.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Смотреть →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand values */}
      <section className="bg-gray-light py-20 md:py-24">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-mid">
            {[
              { num: '01', label: 'Кнопочные застёжки', desc: 'Трансформация за секунды' },
              { num: '02', label: 'Органический хлопок', desc: 'Только качественные ткани' },
              { num: '03', label: 'Возврат 30 дней', desc: 'Без лишних вопросов' },
              { num: '04', label: 'Вечный стиль', desc: 'Вне трендов и сезонов' },
            ].map(v => (
              <div key={v.num} className="bg-gray-light px-8 py-10">
                <span className="font-body text-[10px] text-gray-mid tracking-widest block mb-4">{v.num}</span>
                <h3 className="font-display text-xl font-light mb-2">{v.label}</h3>
                <p className="font-body text-xs text-graphite">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram-style grid */}
      <section className="py-20 md:py-28 px-6 md:px-10 max-w-screen-2xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-2">Наш стиль</p>
            <h2 className="section-title">Вдохновение</h2>
          </div>
          <a href="https://www.instagram.com/jamila_kavali?igsh=ZjU3NjJmcTN0cmF3" target="_blank" rel="noopener noreferrer" className="font-body text-[11px] uppercase tracking-widest text-graphite hover:text-ink border-b border-graphite pb-0.5 hidden md:block">
            @jamila_kavali
          </a>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[
            '/bomber-beige-1.jpg',
            '/sweat-navy-5.jpg',
            '/bomber-black-4.jpg',
            '/sweat-beige-6.jpg',
            '/bomber-navy-2.jpg',
            '/sweat-black-3.jpg',
          ].map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden group cursor-pointer">
              <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
