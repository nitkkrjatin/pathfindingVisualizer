import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const nodes = []
for (let row = 0; row < 21; row++) {
  const currentRow = []
  for (let col = 0; col < 45; col++) {
    const currentNode = {
      row,
      col,
      distance: 10000,
      prev: null,
      isStart: row === 10 && col === 5,
      isFinish: row === 10 && col === 44,
      unvisited: true,
      isVisited: false,
    }
    currentRow.push(currentNode)
  }
  nodes.push(currentRow)
}
const createGrid = () => {
  const newGrid = []
  for (let row = 0; row < 21; row++) {
    const currentRow = []
    for (let col = 0; col < 45; col++) {
      const currentNode = {
        row,
        col,
        distance: 10000,
        prev: null,
        isStart: row === 10 && col === 5,
        isFinish: row === 10 && col === 44,
        unvisited: true,
        isVisited: false,
      }
      currentRow.push(currentNode)
    }
    newGrid.push(currentRow)
  }
  return newGrid
}
const algo = localStorage.getItem('algo')
  ? localStorage.getItem('algo')
  : 'dijkstra'
const speed = localStorage.getItem('speed')
  ? localStorage.getItem('speed')
  : 'average'
const intialState = {
  nodes,
  algo: algo,
  speed: speed,
  isLoading: false,
}

export const update = createAsyncThunk('grid', (node) => {
  return node
})

const gridSlice = createSlice({
  name: 'grid',
  initialState: intialState,
  reducers: {
    reset: (state) => {
      state.nodes = createGrid()
      state.algo = localStorage.getItem('algo')
      state.speed = localStorage.getItem('speed')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(update.fulfilled, (state, action) => {
        state.nodes[action.payload.row][action.payload.col] = action.payload
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true
      })
  },
})

export const { reset } = gridSlice.actions
export default gridSlice.reducer
