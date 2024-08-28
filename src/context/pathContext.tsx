import { Children, createContext, ReactNode, useState} from "react";
import { AlgorithmType, MazeType, GridType } from "../utils/types"
import { createGrid } from "../utils/helpers";
import { END_TILE_CONFIGURATION, START_TILE_CONFIGURATION } from "../utils/constants";

interface PathContextInterface {
    algorithm: AlgorithmType; 
    setAlgorithm: (Algorithm: AlgorithmType) => void; 
    maze: MazeType; 
    setMaze: (Maze: MazeType) => void; 
    grid: GridType;
    setGrid: (grid: GridType) => void;
    isPathFound : boolean; 
    setIsPathFound: (isPathFound: boolean) => void;  
}

export const PathFindingContext = createContext<
PathContextInterface | undefined>(undefined); 

export  const PathFindingProvider = ({children} : {children: ReactNode}) => {
    const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS"); 
    const [maze, setMaze] = useState<MazeType>("NONE"); 
    const [grid, setGrid] = useState<GridType>(createGrid(START_TILE_CONFIGURATION, END_TILE_CONFIGURATION)); 
    const [isPathFound, setIsPathFound] = useState<boolean>(false); 

    return (
        <PathFindingContext.Provider 
            value={
                {
                   algorithm, 
                   setAlgorithm, 
                   isPathFound, 
                   setIsPathFound, 
                   maze, 
                   setMaze,
                   grid, 
                   setGrid
                }
            }
        >
            {children}
        </PathFindingContext.Provider>
    )
};

