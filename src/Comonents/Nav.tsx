
import React, { MutableRefObject, useState } from 'react'
import PlayButton from './PlayButton'
import Select from './Select'
import { usePathFinding } from '../hooks/usePathFinding'
import { EXTENDED_SLEEP_TIME, MAZES, PATHFINDING_ALGORITHM, SLEEP_TIME, SPEEDS } from '../utils/constants'
import { AlgorithmType, MazeType, SpeedType } from '../utils/types'
import { resetGrid } from '../utils/resetGrid'
import { useTile } from '../hooks/useTile'
import { runMazeAlgorithm } from '../utils/runMazeAlgorithm'
import { useSpeed } from '../hooks/useSpeed'
import { RunPathFindingAlgorithm } from '../utils/RunPathFindingAlgorithm'
import { animatePath } from '../utils/animatePath'

const Nav = ( {isVisualizing}: {isVisualizing: MutableRefObject<boolean>}) => {

    const {grid, maze, setMaze, setGrid, isPathFound, setIsPathFound, algorithm, setAlgorithm} = usePathFinding(); 
    const {startTile, endTile} = useTile(); 
    const [isDisabled, setIsDisabled] = useState(false); 

    const {speed, setSpeed} = useSpeed();
    const handleGeneratingMaze = (maze:MazeType) => {
        resetGrid({grid, startTile, endTile})
        if(maze === "NONE") {
            setMaze(maze); 
            return; 
        }

        setMaze(maze); 
        setIsDisabled(true); 
        runMazeAlgorithm({
            maze, grid, startTile, endTile, setIsDisabled, speed
        })
        const newGrid = grid.slice(); 
        setGrid(newGrid); 
        setIsPathFound(false); 
    }

    const handleRunVisualizer = () => {
        if(isPathFound){
            setIsPathFound(false); 
            resetGrid({grid: grid.slice(), startTile, endTile})
            return; 
        }

        const{traversedTiles, path} = RunPathFindingAlgorithm({
            algorithm, 
            grid, 
            startTile, 
            endTile
        })

        animatePath(traversedTiles, path, startTile, endTile, speed)
        setIsDisabled(true); 
        isVisualizing.current = true; 
        setTimeout(() => {
            const newGrid = grid.slice(); 
            setGrid(newGrid); 
            setIsPathFound(true); 
            setIsDisabled(false); 
            isVisualizing.current = false; 
        }, (SLEEP_TIME * (traversedTiles.length + SLEEP_TIME *2) + EXTENDED_SLEEP_TIME * (path.length + 60) * SPEEDS.find((s) => s.value === speed)!.value)); 
    }
  return (
    <div className='flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0'>
        <div className='flex items-center lg:justify-between justify-center w-full sm:w-[52rem]'>
            <h1 className='lg:flex hidden w-[40%] text-2xl pl-1'>
                PathFinding Visualizer
            </h1>
            <div className='flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4
            sm:space-x-4'>
                <Select
                    label = 'Maze'
                    value = {maze}
                    options={MAZES}
                   onChange={(e) => {
                        handleGeneratingMaze(e.target.value as MazeType)
                   }}
                />
                <Select 
                    label='Graph'
                    value={algorithm}
                    options={PATHFINDING_ALGORITHM}
                    onChange={(e) => {
                        setAlgorithm(e.target.value as AlgorithmType)
                    }}
                />
                <Select 
                    label='Speed'
                    value={speed}
                    options={SPEEDS}
                    isDisabled = {isDisabled}
                    onChange={(e) => {
                        setSpeed(parseFloat(e.target.value) as SpeedType); 
                    }}
                />
                <PlayButton 
                    isDisabled = {isDisabled}
                    isPathFound = {isPathFound}
                    handleRunVisualizer={handleRunVisualizer}
                />
            </div>
        </div>
      
    </div>
  )
}

export default Nav
