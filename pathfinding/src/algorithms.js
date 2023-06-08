let nodes = []

export const dijkstra = (grid) => {
  const ans = []
  let start
  let end
  nodes = []
  for (let i = 0; i < grid.length; i++) {
    let curr = []
    for (let j = 0; j < grid[0].length; j++) {
      let node = {
        ...grid[i][j],
      }
      curr.push(node)
      if (grid[i][j].isStart) start = node
      if (grid[i][j].isFinish) end = node
    }
    nodes.push(curr)
  }
  return dijkstraAlgo(start, end, ans)
}

const dijkstraAlgo = (start, finish, ans) => {
  start.distance = 0
  let unvisitedNodes = getAllNodes()
  while (!!unvisitedNodes.length) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
    let curr = unvisitedNodes.shift()
    if (curr.isWall) continue
    if (curr.distance === 10000) return ans
    curr.unvisited = false
    ans.push(curr)
    if (curr === finish) return ans
    updateNodes(curr)
  }
}

const updateNodes = (curr) => {
  const unvisitedNeighbors = getNeighbors(curr)
  for (const neighbors of unvisitedNeighbors) {
    neighbors.distance = curr.distance + 1
    neighbors.prev = curr
  }
}

const getNeighbors = (curr) => {
  const arr = []
  const { row, col } = curr
  if (row > 0) arr.push(nodes[row - 1][col])
  if (row < nodes.length - 1) arr.push(nodes[row + 1][col])
  if (col > 0) arr.push(nodes[row][col - 1])
  if (col < nodes[0].length - 1) arr.push(nodes[row][col + 1])
  return arr.filter((n) => n.unvisited)
}

const getAllNodes = () => {
  const ans = []
  for (const row of nodes) {
    for (const node of row) {
      ans.push(node)
    }
  }
  return ans
}

export const getShortestPath = () => {
  let ans = []
  let curr = null
  for (const row of nodes) {
    for (const node of row) {
      if (node.isFinish) {
        curr = node
        break
      }
    }
  }
  while (curr !== null) {
    ans.unshift(curr)
    curr = curr.prev
  }
  return ans
}
