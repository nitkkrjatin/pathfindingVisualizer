import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { update, updateMouse } from '../features/grid/gridSlice'

const PathfindingVisualizer = () => {
  const dispatch = useDispatch()
  const { nodes, mouseIsPressed, doingAnimation } = useSelector(
    (state) => state.grid
  )

  const handleMouseDown = (node) => {
    if (doingAnimation) return
    const row = node.target.attributes.i.value
    const col = node.target.attributes.j.value
    const newNode = {
      ...nodes[row][col],
      isWall: !nodes[row][col].isWall,
    }
    if(newNode.isFinish||newNode.isStart) return
    dispatch(updateMouse(true))
    dispatch(update(newNode))
  }

  const handleMouseEnter = (node) => {
    if (!mouseIsPressed || doingAnimation) return
    const row = node.target.attributes.i.value
    const col = node.target.attributes.j.value
    const newNode = {
      ...nodes[row][col],
      isWall: !nodes[row][col].isWall,
    }
    if(newNode.isFinish||newNode.isStart) return
    dispatch(update(newNode))
  }

  const handleMouseUp = () => {
    if (doingAnimation) return
    dispatch(updateMouse(false))
  }

  return (
    <div className='centered-div py-3'>
      <Table className='table-sm'>
        <tbody>
          {nodes.map((row, rowIdx) => (
            <tr key={rowIdx} id={rowIdx}>
              {row.map((node, nodeIdx) => (
                <td
                  key={`${rowIdx}-${nodeIdx}`}
                  id={`${rowIdx}-${nodeIdx}`}
                  i={rowIdx}
                  j={nodeIdx}
                  className={`node ${
                    nodes[rowIdx][nodeIdx].isFinish
                      ? 'node-finish'
                      : nodes[rowIdx][nodeIdx].isStart
                      ? 'node-start'
                      : nodes[rowIdx][nodeIdx].isVisited
                      ? 'node-visited'
                      : node.isWall
                      ? 'node-wall'
                      : ''
                  }`}
                  onMouseDown={(node) => handleMouseDown(node)}
                  onMouseEnter={(node) => handleMouseEnter(node)}
                  onMouseUp={() => handleMouseUp()}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default PathfindingVisualizer
