import React from "react";
import { RootStore, StoreContext } from "./stores";



export const getStoreFromContext = (): RootStore => {
  const stores = React.useContext(StoreContext);
  
  if (stores === null) {
    throw new Error("Stores are not initialised");
  } 
  
  return stores;
};

