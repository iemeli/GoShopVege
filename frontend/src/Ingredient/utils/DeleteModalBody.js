import React from 'react'
import { Link } from 'react-router-dom'

const DeleteModalBody = ({ ingredient }) => (
  <div>
    <h6>
      Otathan huomioon että <strong>{ingredient.name}</strong> poistuu samalla
      seuraavista ruoista:
    </h6>
    {ingredient.usedInFoods.map(f => (
      <div key={f.id}>
        <Link to={`/ruoat/${f.name}`}>{f.name}</Link>
      </div>
    ))}
  </div>
)

export default DeleteModalBody
