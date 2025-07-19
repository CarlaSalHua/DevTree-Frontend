import { createContext, useState } from "react";

type ViewsContextType = {
  views: number;
  setViews: (v: number) => void;
};

const ViewsContext = createContext<ViewsContextType | undefined>(undefined);

export const ViewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [views, setViews] = useState(0);

  return (
    <ViewsContext.Provider value={{ views, setViews }}>
      {children}
    </ViewsContext.Provider>
  );
};

export default ViewsContext;
