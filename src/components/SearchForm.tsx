import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "./ErrorMessage";
import { searchByHandle } from "../api/DevTreeAPI";
import { Link } from "react-router-dom";

export default function SearchForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: "",
    },
  });

  const mutation = useMutation({
    mutationFn: searchByHandle,
  });

  const handle = watch("handle");

  const handleSearch = () => {
    const slug = slugify(handle);
    mutation.mutate(slug);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="bg-white rounded-xl shadow-md p-6 space-y-6 w-full"
    >
      <div className="relative flex items-center border border-gray-200 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-green-500">
        <span className="text-gray-500 font-medium">devtree.com/</span>
        <input
          type="text"
          id="handle"
          className="ml-2 flex-1 bg-transparent focus:outline-none focus:ring-0 text-gray-700 placeholder:text-gray-400"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>

      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

      <div className="mt-4 min-h-[2rem]">
        {mutation.isPending && (
          <p className="text-center text-gray-500">Cargando...</p>
        )}
        {mutation.error && (
          <p className="text-center text-red-600 font-bold">
            {mutation.error.message}
          </p>
        )}
        {mutation.data && (
          <p className="text-center text-green-600 font-semibold">
            {mutation.data} —&nbsp;
            <Link
              to={"/auth/register"}
              state={{ handle: slugify(handle) }}
              className="underline hover:text-green-800"
            >
              Crear cuenta
            </Link>
          </p>
        )}
      </div>

      <input
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white p-3 text-lg w-full uppercase rounded-lg font-semibold transition-all duration-300"
        value="Obtener mi DevTree"
      />
    </form>
  );
}
