import { dropFromQueue, isEqual } from "../../../utils/helpers";
import { initFunctionCost, initHeruisticCost } from "../../../utils/heuristics";
import { GridType, TileType } from "../../../utils/types";
import { getAdjacent } from "./bfs";

export const aStar = (grid: GridType, startTile: TileType, endTile: TileType) => {

    const traversedTiles = []; 
    const heuristicCost = initHeruisticCost(grid, endTile); 
    const functionCost = initFunctionCost(); 

    const base = grid[startTile.row][startTile.col]; 

    base.distance = 0; 
    functionCost[base.row][base.col] = base.distance+heuristicCost[base.row][base.col]; 

    base.isTraversed = true; 
    const unTraversedTiles = [base]; 

    while(unTraversedTiles.length) {
        unTraversedTiles.sort((a, b) => {
            if(functionCost[a.row][a.col] === functionCost[b.row][b.col]){
                return b.distance-a.distance; 
            }
            return functionCost[a.row][a.col]-functionCost[b.row][b.col]; 
        })

        const currentTile = unTraversedTiles.shift(); 

        if(currentTile) {
            if(currentTile.isWall) continue; 
            if(currentTile.distance === Infinity) break; 


            currentTile.isTraversed = true; 
            traversedTiles.push(currentTile); 
            if(isEqual(currentTile, endTile)) break; 

            const neighbors = getAdjacent(grid, currentTile); 

            for(let i = 0; i<neighbors.length; i++) {
                const distanceNeighbor = currentTile.distance + 1; 
                if(distanceNeighbor < neighbors[i].distance) {
                    dropFromQueue(neighbors[i], unTraversedTiles); 
                    neighbors[i].distance = distanceNeighbor; 
                    functionCost[neighbors[i].row][neighbors[i].col] = neighbors[i].distance + heuristicCost[neighbors[i].row][neighbors[i].col]; 
                    neighbors[i].parent = currentTile; 
                    unTraversedTiles.push(neighbors[i]); 
                }
            }
        }
    }
    
    const path = []; 
    let current = grid[endTile.row][endTile.col]; 

    while(current !== null) {
        current.isPath = true; 
        path.unshift(current); 
        current = current.parent!; 
    }

    return {traversedTiles, path}; 
}