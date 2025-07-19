import { useContext } from "react";
import ViewsContext from "./ViewsProvider";

export const useViews = () => {
  const context = useContext(ViewsContext);
  if (!context) {
    throw new Error("useViews debe usarse dentro de un ViewsProvider");
  }
  return context;
};
