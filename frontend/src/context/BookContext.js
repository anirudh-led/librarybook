import { createContext } from "react";

export const BooksContext = createContext();

export const BooksContextProvider = ({ children }) => {
    return (
        <BooksContext.Provider>
            { children }
        </BooksContext.Provider>
    )
} 