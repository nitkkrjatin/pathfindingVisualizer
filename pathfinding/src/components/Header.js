import { LinkContainer } from 'react-router-bootstrap'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../features/grid/gridSlice'
import { Navbar, NavDropdown, Nav, Container, Button } from 'react-bootstrap'
import { pathfindingAlgo, getShortestPath } from '../algorithms'
import { gridSize, speedConstants } from '../constants/Constants'

const Header = () => {
  let algo = localStorage.getItem('algo')
  // console.log(localStorage.getItem('speed'))
  let speed = localStorage.getItem('speed') ?? "fast"
  let sp = speedConstants[speed]
  const dispatch = useDispatch()
  const { grid } = useSelector((state) => state)
  const onChange = (alg) => {
    return () => {
      localStorage.setItem('algo', alg)
      algo = alg
      dispatch(reset())
    }
  }
  const onChangeSpeed = (s) => {
    return () => {
      sp = speedConstants[s]
      localStorage.setItem('speed', s)
      // console.log(sp)
      speed = s
      dispatch(reset())
    }
  }
  let doingAnimation = false
  const animate = (path, shortestPath) => {
    for (let i = 0; i <= path.length; i++) {
      // console.log({ sp })
      if (i === path.length) {
        setTimeout(() => {
          // console.log(doingAnimation)
          animateShortestPath(shortestPath)
        }, sp * i)
        return
      }
      setTimeout(() => {
        // console.log(doingAnimation)
        const node = path[i]
        document.getElementById(`${node.row}-${node.col}`).className =
          'node node-visited'
      }, sp * i)
    }
  }

  const animateShortestPath = (shortestPath) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        // console.log(doingAnimation)
        if (i === shortestPath.length - 1) {
          doingAnimation = false
        }
        const node = shortestPath[i]
        document.getElementById(`${node.row}-${node.col}`).className =
          'node node-shortest-path'
      }, speedConstants.path * i)
    }
  }

  const visualizeDijkstra = () => {
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
              : grid.nodes[i][j].isWall
                ? 'node node-wall'
                : 'node'
      }
    }
    const path = pathfindingAlgo(grid.nodes, algo)
    const shortestPath = getShortestPath()
    doingAnimation = true
    // console.log(doingAnimation)
    animate(path, shortestPath)
  }

  const clear = () => {
    // console.log(doingAnimation)
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

  useEffect(() => {
    dispatch(reset())
  }, [algo, speed, dispatch])
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
              <NavDropdown title='Algorithms' menuVariant='dark' id='drop'>
                <LinkContainer to='/#' style={{ fontWeight: 'bold' }}>
                  <NavDropdown.Item id='item' onClick={onChange('dijkstra')}>
                    Dijkstra's Algorithm
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/#' style={{ fontWeight: 'bold' }}>
                  <NavDropdown.Item id='item' onClick={onChange('A*')}>
                    A* Search
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown
                title={`Speed: ${grid.speed}`}
                className='ml-auto'
                id='drop'
              >
                <LinkContainer to='/#' style={{ fontWeight: 'bold' }}>
                  <NavDropdown.Item id='item' onClick={onChangeSpeed('slow')}>
                    Slow
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/#' style={{ fontWeight: 'bold' }}>
                  <NavDropdown.Item
                    id='item'
                    onClick={onChangeSpeed('average')}
                  >
                    Average
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/#' style={{ fontWeight: 'bold' }}>
                  <NavDropdown.Item id='item' onClick={onChangeSpeed('fast')}>
                    Fast
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <Nav.Link id='btn' onClick={clear}>
                Clear Board
              </Nav.Link>
            </Nav>
          }
          <Button
            // className='btn-btn-mr-auto navbar-btn'
            style={{ color: 'black', backgroundColor: '#5adac2' }}
            onClick={visualizeDijkstra}
          >
            Visualize {grid.algo} Algorithm
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
