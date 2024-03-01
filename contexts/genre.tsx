// 'use client'

// import { createContext, useContext, useState } from "react";

// interface Props {
//   selectedGenres: string[];
//   setSelectedGenres: (selectedGenres: string[]) => void;
// }

// const SelectedGenresContext = createContext<Props | undefined>(undefined);

// export const SelectedGenresProvider = ({ children }: {children: React.ReactNode}) => {
//   const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

//   return (
//     <SelectedGenresContext.Provider
//       value={{ selectedGenres, setSelectedGenres }}
//     >
//       {children}
//     </SelectedGenresContext.Provider>
//   );
// };

// export const useSelectedGenres = (): Props => {
//   const context = useContext(SelectedGenresContext);
//   if (!context) {
//     throw new Error(
//       'useSelectedGenres must be used within a SelectedGenresProvider'
//     );
//   }
//   return context;
// }