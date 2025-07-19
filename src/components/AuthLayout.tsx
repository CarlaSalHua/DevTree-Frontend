import { Link, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm md:max-w-md">
        <header className="mb-6 text-center">
          <Link to="/" className="text-3xl font-extrabold text-green-700">
            DevTree
          </Link>
        </header>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout