import { BooksContext } from "../context/BookContext";
import { useContext } from "react";

export const useBooksContext = () => {
  const context = useContext(BooksContext);

  if (!context){
    throw Error('err. hook must be used in the provider!!!! :C')
  }

  return context
};
