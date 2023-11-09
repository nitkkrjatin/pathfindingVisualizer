import { algorithmsConstant } from "./constants/Constants"

let nodes = []

export const pathfindingAlgo = (grid, algo) => {
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
  if (algo === algorithmsConstant.aStar) return aStar(start, end, ans)
  if (algo === algorithmsConstant.dijkstra) return dijkstra(start, end, ans)
}

const dijkstra = (start, finish, ans) => {
  start.distance = 0
  let unvisitedNodes = getAllNodes()
  while (unvisitedNodes.length) {
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
    neighbors.parent = curr
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
  while (curr.parent) {
    ans.unshift(curr)
    curr = curr.parent
  }
  ans.unshift(curr)
  return ans
}

const aStar = (start, end, ans) => {
  const open = []
  open.push(start)
  ans.push(start)
  while (open.length) {
    let currNode = open[0]
    let idx = 0
    for (let i = 0; i < open.length; i++) {
      if (open[i].f < currNode.f) {
        currNode = open[i]
        idx = i
      }
    }
    if (currNode === end) {
      return ans
    }
    open.splice(idx, 1)
    currNode.close = true
    // ans.push(currNode)
    const neighbors = getNeighbors(currNode)
    for (const neighnor of neighbors) {
      if (neighnor.isWall || neighnor.close) {
        continue
      }
      const gScore = currNode.g = 1
      let isBest = false
      if (neighnor.unvisited) {
        isBest = true
        neighnor.h = heuristic(neighnor, end)
        neighnor.unvisited = false
        open.push(neighnor)
        ans.push(neighnor)
      }
      if (gScore < neighnor.g) {
        isBest = true
      }
      
      if (isBest) {
        neighnor.parent = currNode
        neighnor.g = gScore
        neighnor.f = neighnor.g + neighnor.h
      }
    }
  }
  return ans
}

const heuristic = (node1, node2) => {
  return (Math.abs(node2.row - node1.row) + Math.abs(node2.col - node1.col))
}
