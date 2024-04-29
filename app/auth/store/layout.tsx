interface StoreAuthLayoutProps {
  children: React.ReactNode
}

const StoreAuthLayout: React.FC<StoreAuthLayoutProps> = ({ children }) => {
  return (
    <main className="w-full h-full flex items-center justify-center ">
      {children}
    </main>
  )
}

export default StoreAuthLayout
