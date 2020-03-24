import React from 'react'
import useField from '../../hooks/useField'
import { useMutation } from '@apollo/client'
import { ADD_INGREDIENT } from '../../queries'

const NewIngredient = () => {
  const [name, resetName] = useField('text')
  const [price, resetPrice] = useField('number')
  const [kcal, resetKcal] = useField('text')

  const [addIngredient] = useMutation(ADD_INGREDIENT)

  const submit = async (e) => {
    e.preventDefault()

    try {
      await addIngredient({
        variables: {
          name: name.value,
          price: Number(price.value),
          ...kcal.value && { kcal: Number(kcal.value) }
        }
      })
    } catch (e) {
      console.log('Error adding ingredient in NewIngredient', e.message)
    }

    resetName()
    resetPrice()
    resetKcal()
  }

  return (
    <div>
      <form onSubmit={submit}>
        Nimi:
        <input {...name} />
        <br />
        Hinta:
        <input {...price} />
        <br />
        Kilokalorit:
        <input {...kcal} />
        <button type='submit'>Lisää ainesosa</button>
      </form>
    </div>
  )
}


export default NewIngredient