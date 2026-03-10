import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { items } = useWishlist()

  return (
    <main className="pt-8 pb-24 min-h-[60vh]">
      <div className="border-b border-gray-light px-6 md:px-10 max-w-screen-2xl mx-auto pb-10">
        <p className="font-body text-[10px] uppercase tracking-widest text-gray-mid mb-2">Личный кабинет</p>
        <h1 className="section-title">Избранное</h1>
      </div>
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto pt-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <h2 className="font-display text-2xl font-light text-graphite">Список пуст</h2>
            <p className="font-body text-sm text-gray-mid">Нажмите на сердечко, чтобы сохранить товар</p>
            <Link to="/catalog" className="btn-primary mt-4">Перейти в каталог</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  )
}
