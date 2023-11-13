import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { update, updateMouse, updateStatus } from '../features/grid/gridSlice'

const PathfindingVisualizer = () => {
  const dispatch = useDispatch()
  const { nodes, mouseIsPressed, doingAnimation,status } = useSelector(
    (state) => state.grid
  )

  const handleMouseDown = (node) => {
    if (doingAnimation) return
    const row = node.target.attributes.i.value
    const col = node.target.attributes.j.value
    if(nodes[row][col].isStart){
      dispatch(updateStatus("start"))
      const newNode = {
        ...nodes[row][col],
        isStart: false,
      }
      dispatch(updateMouse(true))
      dispatch(update(newNode))
      return
    }
    if(nodes[row][col].isFinish){
      dispatch(updateStatus("end"))
      const newNode = {
        ...nodes[row][col],
        isFinish: false,
      }
      dispatch(updateMouse(true))
      dispatch(update(newNode))
      return
    }
    const newNode = {
      ...nodes[row][col],
      isWall: !nodes[row][col].isWall,
    }
    dispatch(updateMouse(true))
    dispatch(update(newNode))
  }

  const handleMouseEnter = (node) => {
    if (!mouseIsPressed || doingAnimation) return
    const row = node.target.attributes.i.value
    const col = node.target.attributes.j.value
    if(status!=="normal"){
      return
    }
    const newNode = {
      ...nodes[row][col],
      isWall: !nodes[row][col].isWall,
    }
    if(newNode.isFinish||newNode.isStart) return
    dispatch(update(newNode))
  }

  const handleMouseUp = (node) => {
    if (doingAnimation) return
    const row = node.target.attributes.i.value
    const col = node.target.attributes.j.value
    if(status==="start"){
      const newNode = {
        ...nodes[row][col],
        isStart: true,
      }
      dispatch(update(newNode))
      dispatch(updateStatus("normal"))
    }
    if(status==="end"){
      const newNode = {
        ...nodes[row][col],
        isFinish: true,
      }
      dispatch(update(newNode))
      dispatch(updateStatus("normal"))
    }
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
                  onMouseUp={(node) => handleMouseUp(node)}
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
