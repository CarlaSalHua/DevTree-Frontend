import { Link } from 'react-router-dom'

export default function HomeNavigation() {
  return (
    <>
        <Link
            className="text-green-700 hover:underline font-semibold"
            to='/auth/login'
        >Iniciar Sesión</Link>
    
        <Link
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
            to='/auth/register'
        >Registrarme</Link>
    </>
  )
}
