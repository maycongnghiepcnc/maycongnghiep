import { notFound } from 'next/navigation'
import { getCategoryById } from '@/app/actions/categories'
import { CategoryForm } from '../../category-form'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const category = await getCategoryById(id)

  if (!category) {
    notFound()
  }

  return <CategoryForm initialData={category} />
}
