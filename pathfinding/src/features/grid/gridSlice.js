import { createSlice, createAction } from '@reduxjs/toolkit'
import { gridSize } from '../../constants/Constants'

export const updateAnimationState = createAction('grid/updateAnimationState')
export const update = createAction('grid/update')
export const updateMouse = createAction('grid / updateMouse')
const grid = []
for (let row = 0; row < gridSize.rowSize; row++) {
  const currentRow = []
  for (let col = 0; col < gridSize.colSize; col++) {
    const currentNode = {
      row,
      col,
      distance: 10000,
      g:10000,
      f:0,
      h:0,
      parent:null,
      close:false,
      prev: null,
      isStart: row === 10 && col === 5,
      isFinish: row === 10 && col === 38,
      unvisited: true,
      isVisited: false,
      isWall: false,
    }
    currentRow.push(currentNode)
  }
  grid.push(currentRow)
}
// const createGrid = () => {
//   const newGrid = []
//   for (let row = 0; row < 22; row++) {
//     const currentRow = []
//     for (let col = 0; col < 60; col++) {
//       const currentNode = {
//         row,
//         col,
//         distance: 10000,
//         prev: null,
//         isStart: row === 10 && col === 5,
//         isFinish: row === 10 && col === 44,
//         unvisited: true,
//         isVisited: false,
//         isWall: false,
//       }
//       currentRow.push(currentNode)
//     }
//     newGrid.push(currentRow)
//   }
//   return newGrid
// }
const algo = localStorage.getItem('algo')
  ? localStorage.getItem('algo')
  : 'dijkstra'
const speed = localStorage.getItem('speed') ?? "fast"
const intialState = {
  nodes: grid,
  algo: algo,
  speed: speed,
  mouseIsPressed: false,
  doingAnimation: false,
}

const gridSlice = createSlice({
  name: 'grid',
  initialState: intialState,
  reducers: {
    reset: (state) => {
      state.nodes = grid
      state.algo = localStorage.getItem('algo')
      state.speed = localStorage.getItem('speed') ?? "fast"
      state.doingAnimation = false
      state.mouseIsPressed = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(update, (state, action) => {
        state.nodes[action.payload.row][action.payload.col] = action.payload
      })
      .addCase(updateMouse, (state, action) => {
        state.mouseIsPressed = action.payload
      })
      .addCase(updateAnimationState, (state, action) => {
        state.doingAnimation = action.payload
      })
  },
})

export const { reset } = gridSlice.actions
export default gridSlice.reducer
