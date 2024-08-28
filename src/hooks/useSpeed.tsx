import { useContext } from "react"
import { SpeedContext } from "../context/speedContext"


export const useSpeed = ()=> {
    const context = useContext(SpeedContext); 
    if(!context){
        throw new Error("You aer Not authorized to ge the access to the context ")
    }

    return context; 
}