import { getContacts } from '@/app/actions/crm'
import { OpportunityForm } from '../opportunity-form'

export default async function CreateOpportunityPage() {
  const contacts = await getContacts()
  return <OpportunityForm contacts={contacts} />
}
