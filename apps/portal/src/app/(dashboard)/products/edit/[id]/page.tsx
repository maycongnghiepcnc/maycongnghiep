import { notFound } from 'next/navigation'
import { getProductById } from '@/app/actions/products'
import { getCategories } from '@/app/actions/categories'
import { ProductForm } from '../../product-form'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories()
  ])

  if (!product) {
    notFound()
  }

  return <ProductForm categories={categories} initialData={product} />
}
