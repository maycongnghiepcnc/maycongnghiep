import { notFound } from 'next/navigation'
import { getOpportunityById, getContacts } from '@/app/actions/crm'
import { OpportunityForm } from '../../opportunity-form'

export default async function EditOpportunityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [opportunity, contacts] = await Promise.all([
    getOpportunityById(id),
    getContacts()
  ])

  if (!opportunity) {
    notFound()
  }

  return <OpportunityForm contacts={contacts} initialData={opportunity} />
}
