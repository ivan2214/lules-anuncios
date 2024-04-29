import { NewFerificationStoreForm } from '@/components/auth/store/new-verification-store-form'

const NewVerificationStorePage = ({
  searchParams
}: {
  searchParams: {
    token?: string
  }
}) => {
  return <NewFerificationStoreForm token={searchParams.token} />
}

export default NewVerificationStorePage
