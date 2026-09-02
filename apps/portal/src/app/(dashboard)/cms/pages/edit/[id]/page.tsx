import { PageForm } from '../../page-form'
import { getPageById } from '@/app/actions/pages'
import { notFound } from 'next/navigation'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const page = await getPageById(id)

  if (!page) {
    notFound()
  }

  return <PageForm initialData={page} />
}
