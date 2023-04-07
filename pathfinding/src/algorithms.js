export const dijkstra = (grid) => {
  const ans = []
  let start
  let end
  let nodes = []
  for (let i = 0; i < grid.length; i++) {
    let curr = []
    for (let j = 0; j < grid[0].length; j++) {
      let node = {
        row: grid[i][j].row,
        col: grid[i][j].col,
        distance: 10000,
        prev: null,
        isStart: grid[i][j].isStart,
        isFinish: grid[i][j].isFinish,
        unvisited: true,
        isVisited: false,
      }
      curr.push(node)
      if (grid[i][j].isStart) start = node
      if (grid[i][j].isFinish) end = node
    }
    nodes.push(curr)
  }
  return dijkstraAlgo(nodes, start, end, ans)
}

const dijkstraAlgo = (nodes, start, finish, ans) => {
  start.distance = 0
  let unvisitedNodes = getAllNodes(nodes)
  while (!!unvisitedNodes.length) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
    let curr = unvisitedNodes.shift()
    if (curr.isWall) continue
    if (curr.distance === 10000) return ans
    curr.unvisited = false
    ans.push(curr)
    if (curr === finish) return ans
    update(nodes, curr)
  }
}

const update = (nodes, curr) => {
  const unvisitedNeighbors = getNeighbors(nodes, curr)
  for (const neighbors of unvisitedNeighbors) {
    neighbors.distance = curr.distance + 1
    neighbors.prev = curr
  }
}

const getNeighbors = (nodes, curr) => {
  const arr = []
  const { row, col } = curr
  if (row > 0) arr.push(nodes[row - 1][col])
  if (row < nodes.length - 1) arr.push(nodes[row + 1][col])
  if (col > 0) arr.push(nodes[row][col - 1])
  if (col < nodes[0].length - 1) arr.push(nodes[row][col + 1])
  return arr.filter((n) => n.unvisited)
}

const getAllNodes = (grid) => {
  const nodes = []
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node)
    }
  }
  return nodes
}
