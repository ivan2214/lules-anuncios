import { db } from "@/lib/db";
import { Sidebar } from "@/app/(routes)/offers/components/sidebar";

interface OffersLayoutProps {
  children: React.ReactNode;
}

const OffersLayout: React.FC<OffersLayoutProps> = async ({ children }) => {
  const stores = await db.store.findMany({});
  const categories = await db.category.findMany({});

  return (
    <div className="grid grid-cols-5">
      <Sidebar stores={stores} categories={categories} playlists={[]} className="hidden lg:block" />
      {children}
    </div>
  );
};

export default OffersLayout;
