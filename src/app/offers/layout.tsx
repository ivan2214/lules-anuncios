import { Menu } from "./components/menu";
import { Sidebar } from "./components/sidebar";
import { playlists } from "./data/playlists";

interface OffersLayoutProps {
  children: React.ReactNode;
}

const OffersLayout: React.FC<OffersLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-5">
      <Sidebar playlists={playlists} className="hidden lg:block" />
      {children}
    </div>
  );
};

export default OffersLayout;
