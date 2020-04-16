import React from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { ALL_INGREDIENTS } from '../queries'

const DeleteModalBody = ({ ingredient }) => {
  const ingredientsResult = useQuery(ALL_INGREDIENTS)

  if (ingredientsResult.loading) {
    return <div>...loading</div>
  }

  const ingredients = ingredientsResult.data.allIngredients
  console.log(ingredients)

  return (
    <div>
      <h6>
        Otathan huomioon että <strong>{ingredient.name}</strong> poistuu samalla
        seuraavista ruoista:
      </h6>
      {ingredient.usedInFoods.map((f) => (
        <div key={f.id}>
          <Link to={`/ruoat/${f.name}`}>{f.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default DeleteModalBody
