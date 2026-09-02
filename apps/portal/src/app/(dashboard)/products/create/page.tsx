import { getCategories } from '@/app/actions/categories'
import { ProductForm } from '../product-form'

export default async function CreateProductPage() {
  const categories = await getCategories()
  
  return <ProductForm categories={categories} />
}
