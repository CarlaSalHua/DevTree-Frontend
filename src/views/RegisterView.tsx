import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type { RegisterUser } from "../types/User";
import { registerUser } from "../services/AuthService";
import { toast } from "sonner";
import ErrorMessage from "../components/ErrorMessage";

const RegisterView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegisterUser>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const password = watch("password");

  const onSubmit = async (data: RegisterUser) => {
    try {
      const response = await registerUser(data);
      toast.success(response.data.message);
      reset();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.error || "Error al registrar");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        className="w-full border border-gray-300 rounded px-3 py-2"
        type="text"
        placeholder="Nombre"
        {...register("name", { required: "El nombre es obligatorio" })}
      />
      {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

      <input
        className="w-full border border-gray-300 rounded px-3 py-2"
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "El email es obligatorio",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Formato de email inválido",
          },
        })}
      />
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

      <input
        className="w-full border border-gray-300 rounded px-3 py-2"
        type="text"
        placeholder="Handle"
        {...register("handle", { required: "El handle es obligatorio" })}
      />
      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

      <div className="relative">
        <input
          className={`w-full rounded px-3 py-2 pr-10 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 8,
              message: "Mínimo 8 caracteres",
            },
          })}
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-600"
        >
          {showPassword ? "👁️" : "🙈"}
        </button>
      </div>
      {errors.password && (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      )}

      <div className="relative">
        <input
          className={`w-full rounded px-3 py-2 pr-10 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirmar contraseña"
          {...register("password_confirmation", {
            required: "Confirma tu contraseña",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
        />
        <button
          type="button"
          onClick={toggleConfirmPassword}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-600"
        >
          {showConfirmPassword ? "👁️" : "🙈"}
        </button>
      </div>
      {errors.password_confirmation && (
        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
      )}

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear cuenta
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/auth/login" className="text-green-700 hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </form>
  );
};

export default RegisterView;
