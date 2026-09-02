import { notFound } from 'next/navigation'
import { getContactById } from '@/app/actions/crm'
import { ContactForm } from '../../contact-form'

export default async function EditContactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const contact = await getContactById(id)

  if (!contact) {
    notFound()
  }

  return <ContactForm initialData={contact} />
}
