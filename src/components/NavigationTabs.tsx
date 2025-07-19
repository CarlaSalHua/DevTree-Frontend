import { BookmarkSquareIcon, UserIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const tabs = [
    { name: 'Links', href: '/admin', icon: BookmarkSquareIcon },
    { name: 'Mi Perfil', href: '/admin/profile', icon: UserIcon },
]

export default function NavigationTabs() {
    const location = useLocation()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        navigate(e.target.value)
    }

    return (
        <div className="mb-8">
            {/* Dropdown para pantallas pequeñas */}
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">Selecciona una pestaña</label>
                <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border border-gray-300 focus:border-green-500 focus:ring-green-500 text-gray-700 py-2 px-3"
                onChange={handleChange}
                >
                {tabs.map((tab) => (
                    <option value={tab.href} key={tab.name}>
                    {tab.name}
                    </option>
                ))}
                </select>
            </div>

            {/* Tabs normales para escritorio */}
            <div className="hidden sm:block">
                <nav className="flex space-x-6 border-b border-green-200" aria-label="Tabs">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.href;
                    return (
                    <Link
                        key={tab.name}
                        to={tab.href}
                        className={`group inline-flex items-center py-2 px-4 border-b-4 text-lg font-semibold transition-all duration-300 ${
                        isActive
                            ? 'border-green-600 text-green-700'
                            : 'border-transparent text-gray-500 hover:border-green-400 hover:text-green-600'
                        }`}
                    >
                        <tab.icon
                        className={`mr-2 h-5 w-5 transition-colors duration-200 ${
                            isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-green-500'
                        }`}
                        aria-hidden="true"
                        />
                        <span>{tab.name}</span>
                    </Link>
                    );
                })}
                </nav>
            </div>
        </div>

    )
}