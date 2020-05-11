import React from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components'
import '../../css/menu.css'

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
  return (
    <div>
      <Navbar bg="dark" expand="sm" variant="dark">
        <Navbar.Text>
          <Navbar.Brand>
            <StyledLink to="/">GoShopVege</StyledLink>
          </Navbar.Brand>
        </Navbar.Text>
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
            <Navbar.Text>
              <StyledLink to="/ostoslista">Ostoslista</StyledLink>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu
