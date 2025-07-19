import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import type { LoginUser } from '../types/User';
import { loginUser } from '../services/AuthService';
import { toast } from 'sonner';
import ErrorMessage from '../components/ErrorMessage';
import { useState } from 'react';

const LoginView = () => {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>();

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);

    const onSubmit = async (data: LoginUser) => {
    try {
      const response = await loginUser(data);
      console.log(response)
      localStorage.setItem('AUTH_TOKEN', response.data);
      toast.success('Inicio de sesión exitoso');
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        className="w-full border border-gray-300 rounded px-3 py-2"
        type="email"
        placeholder="Email"
        {...register('email', { required: 'El email es obligatorio' })}
      />
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

      <div className="relative">
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
          type={showPassword ? 'text' : 'password'}
          placeholder="Contraseña"
          {...register('password', { required: 'La contraseña es obligatoria' })}
        />
        <button type="button" onClick={togglePassword} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-600">
          {showPassword ? '👁️' : '🙈'}
        </button>
      </div>
      {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Iniciar sesión
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿No tienes una cuenta?{' '}
        <Link to="/auth/register" className="text-green-700 hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </form>
  )
}

export default LoginView