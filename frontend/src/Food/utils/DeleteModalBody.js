import React from 'react'
import { Link } from 'react-router-dom'

const DeleteModalBody = ({ food }) => (
  <div>
    <h6>
      Otathan huomioon että <strong>{food.name}</strong> poistuu samalla
      seuraavista ruokapaketeista:
    </h6>
    {food.usedInFoodPacks.map(fp => (
      <div key={fp.id}>
        <Link to={`/ruokapaketit/${fp.name}`}>{fp.name}</Link>
      </div>
    ))}
  </div>
)

export default DeleteModalBody
