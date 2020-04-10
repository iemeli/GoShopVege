import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const UpdateFoodPackButton = ({ foodPack }) => (
  <Link to={`/ruokapaketit/paivita/${foodPack.name}`}>
    <Button variant="outline-warning">päivitä</Button>
  </Link>
)

export default UpdateFoodPackButton
