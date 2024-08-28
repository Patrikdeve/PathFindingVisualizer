
import { useContext } from "react";
import { PathFindingContext } from "../context/pathContext";

export const usePathFinding = () => {
    const context = useContext(PathFindingContext); 

    if(!context) {
        throw new Error("Use PathFinding Must be Used withing a PathinFindingInteface Only")
    }

    return context; 
}