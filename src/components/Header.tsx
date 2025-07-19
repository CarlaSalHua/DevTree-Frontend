import { useLocation } from "react-router-dom";
import AdminNavigation from "./nav/AdminNavigation";
import HomeNavigation from "./nav/HomeNavigation";
import Logo from "./Logo";

export default function Header() {
  const location = useLocation();
  return (
    <header className="py-6 px-4 md:px-10 bg-white shadow-md flex justify-between items-center border-b border-green-100">
      <Logo />

      <nav className="space-x-2 md:space-x-4 flex items-center">
        {location.pathname === "/" ? <HomeNavigation /> : <AdminNavigation />}
      </nav>
    </header>
  );
}
