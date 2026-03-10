import { createContext, useContext, useState, ReactNode } from 'react'

interface SearchContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
  query: string
  setQuery: (q: string) => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <SearchContext.Provider value={{
      isOpen,
      open: () => setIsOpen(true),
      close: () => { setIsOpen(false); setQuery('') },
      query,
      setQuery,
    }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be inside SearchProvider')
  return ctx
}
