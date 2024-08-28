import { useContext } from "react"
import { TileContext } from "../context/tileContext"

export const useTile = () => {
    const context = useContext(TileContext); 

    if(!context) {
        throw new Error("You Dont' Have Access to the Context!!"); 
    }
    return context; 
}