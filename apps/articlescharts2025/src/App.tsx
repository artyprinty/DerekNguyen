import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './components/Dashboard'
import { ArticlePage } from './components/ArticlePage'
import { Categories } from './components/Categories'
import { CategoryPage } from './components/CategoryPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:categoryId" element={<CategoryPage />} />
        <Route path=":slug" element={<ArticlePage />} />
      </Route>
    </Routes>
  )
} 