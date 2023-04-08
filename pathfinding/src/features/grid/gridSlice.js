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
      isWall: false,
      onmousedown,
      onmouseup,
      onmouseenter,
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
        isWall: false,
        onmousedown,
        onmouseup,
        onmouseenter,
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
  nodes: createGrid(),
  algo: algo,
  speed: speed,
  isLoading: false,
  mouseIsPressed: false,
  doingAnimation: false,
}

export const update = createAsyncThunk('grid/update', (node) => {
  return node
})

export const updateMouse = createAsyncThunk('grid/updateMouse', (val) => {
  return val
})

export const updateAnimationState = createAsyncThunk(
  'grid/updateAnimationState',
  (val) => {
    return val
  }
)

const gridSlice = createSlice({
  name: 'grid',
  initialState: intialState,
  reducers: {
    reset: (state) => {
      state.nodes = createGrid()
      state.algo = localStorage.getItem('algo')
      state.speed = localStorage.getItem('speed')
      state.doingAnimation = false
      state.mouseIsPressed = false
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
      .addCase(updateMouse.fulfilled, (state, action) => {
        state.mouseIsPressed = action.payload
      })
      .addCase(updateAnimationState.fulfilled, (state, action) => {
        state.doingAnimation = action.payload
      })
  },
})

export const { reset } = gridSlice.actions
export default gridSlice.reducer
