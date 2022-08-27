import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, NavDropdown, Nav, Container, Button } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Pathfinding Visualizer</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto '>
            <NavDropdown title='Algorithms'></NavDropdown>
            <NavDropdown title='Speed' className='ml-auto'></NavDropdown>
          </Nav>
          <Button
            // className='btn-btn-mr-auto navbar-btn'
            style={{ color: 'white', backgroundColor: '#5adac2' }}
          >
            Visualize
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
