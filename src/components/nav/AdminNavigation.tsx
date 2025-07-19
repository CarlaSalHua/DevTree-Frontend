import { useQueryClient } from "@tanstack/react-query";

export default function AdminNavigation() {
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };
  return (
<button
  onClick={logout}
  className="bg-green-600 hover:bg-green-700 text-white uppercase font-semibold text-sm px-4 py-2 rounded-lg transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
>
  Cerrar Sesión
</button>
  );
}
