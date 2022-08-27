import { createSlice } from '@reduxjs/toolkit'

const nodes = []
for (let row = 0; row < 21; row++) {
  const currentRow = []
  for (let col = 0; col < 45; col++) {
    const currentNode = {
      row,
      col,
      isStart: row === 10 && col === 5,
      isFinish: row === 10 && col === 44,
      unvisited: true,
    }
    currentRow.push(currentNode)
  }
  nodes.push(currentRow)
}
const intialState = {
  nodes,
}

const gridSlice = createSlice({
  name: 'grid',
  initialState: intialState,
  reducers: {
    reset: (state) => {
      state.nodes = nodes
    },
  },
})

export const { reset } = gridSlice.actions
export default gridSlice.reducer
