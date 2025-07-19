import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (!token) {
      navigate('/auth/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Bienvenido al panel protegido de DevTree</h1>
      <p className="text-gray-700 text-lg">Este contenido solo es visible para usuarios autenticados.</p>
    </div>
  )
}

export default ProtectedView