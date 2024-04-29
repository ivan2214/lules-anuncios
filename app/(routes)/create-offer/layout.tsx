interface CreateOfferLayoutLayoutProps {
  children: React.ReactNode
}

const CreateOfferLayoutLayout: React.FC<CreateOfferLayoutLayoutProps> = ({
  children
}) => {
  return (
    <main className="w-full h-full flex items-center justify-center">
      {children}
    </main>
  )
}

export default CreateOfferLayoutLayout
