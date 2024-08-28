import { MAX_COLS, MAX_ROWS } from "../../../utils/constants";
import { isEqual, isInQueue } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";



export const getAdjacent = (grid: GridType, tile:TileType) => {
    
    const {row, col} = tile; 
    const neighbours = []; 

    if(row > 0) {
        neighbours.push(grid[row-1][col]); 
    }

    if(row < MAX_ROWS-1){
        neighbours.push(grid[row+1][col]); 
    }

    if(col > 0) {
        neighbours.push(grid[row][col-1]); 
    }

    if(col < MAX_COLS-1) {
        neighbours.push(grid[row][col+1]); 
    }

    return neighbours.filter((neighbor) => !neighbor.isTraversed ); 

}
export const bfs = (grid: GridType, startTile: TileType, endTile:TileType) =>{
    const traversedTiles : TileType[] = []; 
    const base = grid[startTile.row][startTile.col]; 
    base.distance = 0; 
    base.isTraversed = true;

    const unTraversed = [base]; 

    while(unTraversed.length) {
        const tile = unTraversed.shift()!;

        if(tile.isWall) continue; 
        if(tile.distance === Infinity) break; 

        tile.isTraversed = true; 

        traversedTiles.push(tile); 
        if(isEqual(tile, endTile)) break; 

        const adj = getAdjacent(grid, tile); 

       for(let i=0 ; i<adj.length; i++) {
            if(!isInQueue(adj[i], unTraversed)) {

                const neighbor = adj[i]; 
                neighbor.distance = tile.distance+1; 
                neighbor.parent = tile; 
                unTraversed.push(neighbor); 
            }
       }
    }

    const path = []; 
    let tile = grid[endTile.row][endTile.col]; 

    while(tile !== null) {
        tile.isPath = true; 
        path.unshift(tile); 
        tile = tile.parent!; 
    }

    return {traversedTiles, path}; 

}