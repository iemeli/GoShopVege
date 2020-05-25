import React from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { ALL_INGREDIENTS } from '../queries'
import ListIngredients from '../presentational/ListIngredients'

const ListIngredientsContainer = () => {
  const ingredientsResult = useQuery(ALL_INGREDIENTS)

  if (ingredientsResult.loading) {
    return <div>...loading</div>
  }

  const ingredients = ingredientsResult.data.allIngredients

  return (
    <div>
      <h3>
        Ainesosat
        <small style={{ paddingLeft: 10 }}>
          <Link to="/ainesosat/uusi">luo uusi ainesosa</Link>
        </small>
      </h3>
      <ListIngredients ingredients={ingredients} />
    </div>
  )
}

export default ListIngredientsContainer
