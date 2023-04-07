import { LinkContainer } from 'react-router-bootstrap'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset, update } from '../features/grid/gridSlice'
import { Navbar, NavDropdown, Nav, Container, Button } from 'react-bootstrap'
import { dijkstra } from '../algorithms'

const Header = () => {
  let algo = localStorage.getItem('algo')
  let speed = localStorage.getItem('speed')
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
      localStorage.setItem('speed', s)
      speed = s
      dispatch(reset())
    }
  }

  const animate = (path) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i]
        const newNode = {
          ...node,
          isVisited: true,
        }
        dispatch(update(newNode))
      }, 20 * i)
    }
  }

  const visualizeDijkstra = () => {
    const path = dijkstra(grid.nodes)
    dispatch(reset())
    animate(path)
  }

  const clear = () => {
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
