import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const UpdateFoodButton = ({ food }) => (
  <Link to={`/ruoat/paivita/${food.name}`}>
    <Button variant='outline-warning'>
      päivitä
    </Button>
  </Link>
)

export default UpdateFoodButton