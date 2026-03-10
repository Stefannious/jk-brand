import { useState, useMemo } from 'react'
import { products } from '../data/products'
import { Product } from '../types'
import ProductCard from '../components/ProductCard'

type Category = 'all' | 'jackets' | 'sweatshirts'
type Sort = 'default' | 'price-asc' | 'price-desc' | 'new'

export default function Catalog() {
  const [category, setCategory] = useState<Category>('all')
  const [sort, setSort] = useState<Sort>('default')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list: Product[] = category === 'all' ? products : products.filter(p => p.category === category)
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'new') list = [...list].filter(p => p.isNew).concat(list.filter(p => !p.isNew))
    return list
  }, [category, sort])

  const cats: { key: Category; label: string; count: number }[] = [
    { key: 'all', label: 'Все', count: products.length },
    { key: 'jackets', label: 'Куртки', count: products.filter(p => p.category === 'jackets').length },
    { key: 'sweatshirts', label: 'Свитшоты', count: products.filter(p => p.category === 'sweatshirts').length },
  ]

  return (
    <main className="pb-20">
      {/* Header */}
      <div className="border-b border-gray-light px-6 md:px-10 max-w-screen-2xl mx-auto pb-8 pt-8">
        <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-2">JK / Коллекция</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h1 className="section-title">Каталог</h1>

          <div className="flex items-center gap-6">
            {/* Category tabs */}
            <div className="flex gap-5">
              {cats.map(c => (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  className={`font-body text-[11px] uppercase tracking-widest pb-1 transition-all duration-200 ${
                    category === c.key
                      ? 'text-ink border-b border-ink'
                      : 'text-gray-mid hover:text-graphite'
                  }`}
                >
                  {c.label} <span className="text-gray-mid">({c.count})</span>
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative hidden md:block">
              <select
                value={sort}
                onChange={e => setSort(e.target.value as Sort)}
                className="appearance-none bg-transparent border border-gray-light px-4 py-2 font-body text-[11px] uppercase tracking-wider text-graphite cursor-pointer hover:border-ink transition-colors focus:outline-none pr-8"
              >
                <option value="default">По умолчанию</option>
                <option value="new">Сначала новинки</option>
                <option value="price-asc">Цена ↑</option>
                <option value="price-desc">Цена ↓</option>
              </select>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite pointer-events-none">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto py-4">
        <p className="font-body text-xs text-gray-mid">{filtered.length} {filtered.length === 1 ? 'товар' : filtered.length < 5 ? 'товара' : 'товаров'}</p>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-graphite">Товары не найдены</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  )
}
