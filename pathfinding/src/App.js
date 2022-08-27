import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PathfindingVisualizer from './screens/PathfindingVisualizer'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Routes>
          <Route path='/' element={<PathfindingVisualizer />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
