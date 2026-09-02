import { getContacts, getOpportunities } from '@/app/actions/crm'
import { ActivityForm } from '../activity-form'

export default async function CreateActivityPage() {
  const [contacts, opportunities] = await Promise.all([
    getContacts(),
    getOpportunities()
  ])
  
  return <ActivityForm contacts={contacts} opportunities={opportunities} />
}
