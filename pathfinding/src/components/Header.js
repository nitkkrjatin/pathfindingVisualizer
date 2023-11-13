import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { reset, updateAlgo, updateAnimationState, updateSpeed } from '../features/grid/gridSlice'
import { Navbar, NavDropdown, Nav, Container, Button } from 'react-bootstrap'
import { pathfindingAlgo, getShortestPath } from '../algorithms'
import { gridSize, speedConstants } from '../constants/Constants'

const Header = () => {
  let algo = localStorage.getItem('algo')
  let speed = localStorage.getItem('speed') ?? "fast"
  let sp = speedConstants[speed]
  const dispatch = useDispatch()
  const { grid } = useSelector((state) => state)
  const { doingAnimation } = grid
  const onChange = (alg) => {
    return () => {
      localStorage.setItem('algo', alg)
      algo = alg
      dispatch(updateAlgo(alg))
    }
  }
  const onChangeSpeed = (s) => {
    return () => {
      sp = speedConstants[s]
      localStorage.setItem('speed', s)
      speed = s
      dispatch(updateSpeed(s))
    }
  }
  const animate = (path, shortestPath) => {
    for (let i = 0; i <= path.length; i++) {
      if (i === path.length) {
        setTimeout(() => {
          animateShortestPath(shortestPath)
        }, sp * i)
        return
      }
      setTimeout(() => {
        const node = path[i]
        document.getElementById(`${node.row}-${node.col}`).className =
          'node node-visited'
      }, sp * i)
    }
  }

  const animateShortestPath = (shortestPath) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        if (i === shortestPath.length - 1) {
          dispatch(updateAnimationState(false))
        }
        const node = shortestPath[i]
        document.getElementById(`${node.row}-${node.col}`).className =
          'node node-shortest-path'
      }, speedConstants.path * i)
    }
  }

  const visualizeDijkstra = () => {
    if (doingAnimation) return
    for (let i = 0; i < gridSize.rowSize; i++) {
      for (let j = 0; j < gridSize.colSize; j++) {
        document.getElementById(`${i}-${j}`).className =
          grid.nodes[i][j].isStart
            ? 'node node-start'
            : grid.nodes[i][j].isFinish
              ? 'node node-finish'
              : grid.nodes[i][j].isWall
                ? 'node node-wall'
                : 'node'
      }
    }
    const path = pathfindingAlgo(grid.nodes, algo)
    const shortestPath = getShortestPath()
    dispatch(updateAnimationState(true))
    animate(path, shortestPath)
  }

  const clear = () => {
    if (doingAnimation) return
    const sr = 10
    const sc = 5
    const er = 10
    const ec = 38
    for (let i = 0; i < gridSize.rowSize; i++) {
      for (let j = 0; j < gridSize.colSize; j++) {
        document.getElementById(`${i}-${j}`).className =
          i === sr && j === sc
            ? 'node node-start'
            : i === er && j === ec
              ? 'node node-finish'
              : 'node'
      }
    }
    dispatch(reset())
  }
  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container fluid>
        <LinkContainer to='/'>
          <Navbar.Brand>Pathfinding Visualizer</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {
            <Nav className='mr-auto ' navbarScroll>
              <NavDropdown title='Algorithms' menuVariant='dark' id={doingAnimation ? 'drop-d' : 'drop'}>
                <LinkContainer to='/#' style={{ fontWeight: 'bold' }}>
                  <NavDropdown.Item id={doingAnimation ? 'item-d' : 'item'} onClick={onChange('dijkstra')} disabled={doingAnimation}>
                    Dijkstra's Algorithm
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/#' style={{ fontWeight: 'bold' }}>
                  <NavDropdown.Item id={doingAnimation ? 'item-d' : 'item'} onClick={onChange('A*')} disabled={doingAnimation}>
                    A* Search
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown
                title={`Speed: ${grid.speed}`}
                className='ml-auto'
                id={doingAnimation ? 'drop-d' : 'drop'}
              >
                <LinkContainer to='/#' style={{ fontWeight: 'bold' }}>
                  <NavDropdown.Item id={doingAnimation ? 'item-d' : 'item'} onClick={onChangeSpeed('slow')} disabled={doingAnimation}>
                    Slow
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/#' style={{ fontWeight: 'bold' }}>
                  <NavDropdown.Item
                    id={doingAnimation ? 'item-d' : 'item'}
                    onClick={onChangeSpeed('average')}
                    disabled={doingAnimation}
                  >
                    Average
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/#' style={{ fontWeight: 'bold' }}>
                  <NavDropdown.Item id={doingAnimation ? 'item-d' : 'item'} onClick={onChangeSpeed('fast')} disabled={doingAnimation}>
                    Fast
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <Nav.Link id={doingAnimation ? 'btn-d' : 'btn'} onClick={clear} disabled={doingAnimation}>
                Clear Board
              </Nav.Link>
            </Nav>
          }
          <Button
            // className='btn-btn-mr-auto navbar-btn'
            style={doingAnimation ? { color: 'black', backgroundColor: 'red' } : { color: 'black', backgroundColor: '#5adac2' }}
            onClick={visualizeDijkstra}
            disabled={doingAnimation}
          >
            Visualize {grid.algo} Algorithm
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
