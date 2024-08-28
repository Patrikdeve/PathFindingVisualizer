import React, { useRef } from 'react'
import { PathFindingProvider } from './context/pathContext'
import { TileProvider } from './context/tileContext'
import { SpeedProvider } from './context/speedContext'
import Grid from './Comonents/Grid'
import Nav from './Comonents/Nav'

const App = () => {
  const isVisualizing = useRef(false); 

  return (
    <PathFindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div className='h-screen w-screen flex flex-col'>
              <Nav isVisualizing = {isVisualizing}/>
              <Grid isVisualizing = {isVisualizing}/>
         </div>
        </SpeedProvider>
       
      </TileProvider>
    </PathFindingProvider>
    
  )
}

export default App
