import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserByHandle, userViews } from "../api/DevTreeAPI";
import HandleData from "../components/HandleData";
import { useEffect, useRef } from "react";
import { useViews } from "../context/useViews";

export default function HandleView() {
  const params = useParams();
  const handle = params.handle!;
  const lastHandleRef = useRef<string | null>(null);
  const { setViews } = useViews(); 
  
  const { data, error, isLoading, refetch } = useQuery({
      queryFn: () => getUserByHandle(handle),
      queryKey: ["handle", handle],
      retry: 1,
      enabled: !!handle
    });
    
  useEffect(() => {
    if (data && handle !== lastHandleRef.current) {
      userViews(handle)
        .then((data) => {
          lastHandleRef.current = handle;
          setViews(data?.views || 0);
          refetch()
        })
        .catch((error) => {
          console.error('Error incrementando las views:', error);
        });
    }
  }, [data, handle, refetch]);

  if (isLoading) return <p className="text-center text-white">Cargando...</p>;
  if (error) return <Navigate to={"/404"} />;
  if (data) return <HandleData data={data} />;
}
