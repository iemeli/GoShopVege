import React from 'react'
import useField from '../../hooks/useField'
import { useMutation } from '@apollo/client'
import { ADD_INGREDIENT } from '../queries'

const NewIngredient = () => {
  const [name, resetName] = useField('text')
  const [price, resetPrice] = useField('number')
  const [kcal, resetKcal] = useField('number')

  const [addIngredient] = useMutation(ADD_INGREDIENT, {
    // update: (store, response) => {
    //   const dataInStore = store.readQuery({ query: ALL_INGREDIENTS })
    //   if (!dataInStore.allIngredients.includes(response.data.addBook)) {
    //     dataInStore.allIngredients.push(response.data.allIngredients)
    //   }
    //   store.writeQuery({
    //     query: ALL_INGREDIENTS,
    //     data: dataInStore
    //   })
    // }
  })

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
      console.log('Error adding ingredient in NewIngredient.js', e.message)
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