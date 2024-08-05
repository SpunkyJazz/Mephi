import { createContext, useContext } from "react";
import { LeagueStore } from "./league";

export const createStore = (): LeagueStore => new LeagueStore();

export const StoreContext = createContext<LeagueStore | null>(null);

export const useStore = (): LeagueStore => {
  const stores = useContext(StoreContext);

  if (!stores) {
    throw new Error(
      "useStore() allow use inside <StoreContext.provider /> only"
    );
  }

  return stores;
};
