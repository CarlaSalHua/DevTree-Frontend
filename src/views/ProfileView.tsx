import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ErrorMessage from "../components/ErrorMessage";

import { updateProfile, uploadImage } from "../api/DevTreeAPI";
import type { ProfileForm, User } from "../types/User";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          image: data,
        };
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  const handleUserProfileForm = (formData: ProfileForm) => {
    const user: User = queryClient.getQueryData(["user"])!;
    user.description = formData.description;
    user.handle = formData.handle;
    updateProfileMutation.mutate(user);
  };

  return (
    <form
      className="bg-white shadow-md p-8 md:p-10 rounded-2xl space-y-6 border border-gray-100"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-3xl font-bold text-green-700 text-center mb-2">
        Editar Perfil
      </legend>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle" className="text-gray-700 font-semibold">
          Nombre de Usuario (Handle)
        </label>
        <input
          type="text"
          className="border border-gray-300 bg-green-50 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          placeholder="@ejemplo"
          {...register("handle", {
            required: "El Nombre de Usuario es obligatorio",
          })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description" className="text-gray-700 font-semibold">
          Descripción
        </label>
        <textarea
          className="border border-gray-300 bg-green-50 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          placeholder="Describe brevemente tu perfil"
          rows={4}
          {...register("description", {
            required: "La Descripción es obligatoria",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="image" className="text-gray-700 font-semibold">
          Imagen de Perfil
        </label>
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border border-gray-300 bg-green-50 rounded-lg p-2 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
        />
      </div>

      <input
        type="submit"
        className="bg-green-600 hover:bg-green-700 p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer transition duration-300"
        value="Guardar Cambios"
      />
    </form>
  );
}
