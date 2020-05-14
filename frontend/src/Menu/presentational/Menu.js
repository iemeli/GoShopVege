import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'
import '../../css/menu.css'
import list from '../../list.svg'

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`

const Menu = () => {
  const history = useHistory()
  return (
    <Navbar collapseOnSelect bg="dark" expand="sm" variant="dark" fixed="top">
      <Navbar.Text>
        <Navbar.Brand>
          <StyledLink to="/">GoShopVege</StyledLink>
        </Navbar.Brand>
      </Navbar.Text>
      <Row>
        <div
          onClick={() => history.push('/ostoslista')}
          onKeyPress={() => history.push('/ostoslista')}
          role="button"
          tabIndex="0"
          className="list"
        >
          <img src={list} alt="list icon" width="40rem" />
        </div>
      </Row>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Navbar.Text>
            <StyledLink to="/ruokapaketit">Ruokapaketit</StyledLink>
          </Navbar.Text>
          <Navbar.Text>
            <StyledLink to="/ruoat">Ruoat</StyledLink>
          </Navbar.Text>
          <Navbar.Text>
            <StyledLink to="/ainesosat">Ainesosat</StyledLink>
          </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
