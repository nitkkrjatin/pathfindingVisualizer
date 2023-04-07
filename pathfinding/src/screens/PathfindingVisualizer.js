import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/grid/gridSlice'

const PathfindingVisualizer = () => {
  const dispatch = useDispatch()
  const { nodes } = useSelector((state) => state.grid)

  return (
    <div className='centered-div py-3'>
      <Table bgcolor='sky blue' className='table-sm'>
        <tbody>
          {nodes.map((row, rowIdx) => (
            <tr key={rowIdx} id={rowIdx}>
              {row.map((node, nodeIdx) => (
                <td
                  key={`${rowIdx}-${nodeIdx}`}
                  id={`${rowIdx}-${nodeIdx}`}
                  className={`node ${
                    nodes[rowIdx][nodeIdx].isFinish
                      ? 'node-finish'
                      : nodes[rowIdx][nodeIdx].isStart
                      ? 'node-start'
                      : nodes[rowIdx][nodeIdx].isVisited
                      ? 'node-visited'
                      : ''
                  }`}
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
