import React from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import ShopListButton from '../../ShopList/ShopListButton'
import DeleteIngredientButton from '../utils/DeleteIngredientButton'

const StyledTh = styled.th`
  padding-left: 20px;
`

const macroDetails = [
  {
    title: 'Energiaa',
    name: 'kcal',
    unit: 'kcal',
  },
  {
    title: 'Rasvaa',
    name: 'fat',
  },
  {
    title: 'josta tyydyttynyttä',
    name: 'saturatedFat',
    unit: 'g',
  },
  {
    title: 'Hiilarit',
    name: 'carbs',
    unit: 'g',
  },
  {
    title: 'joista sokereita',
    name: 'sugars',
    unit: 'g',
  },
  {
    title: 'Protskua',
    name: 'protein',
    unit: 'g',
  },
  {
    title: 'Suolaa',
    name: 'salt',
    unit: 'g',
  },
]

const Ingredient = ({ ingredient }) => {
  const history = useHistory()
  const macros = macroDetails.map(m => ({
    data: ingredient[m.name],
    details: m,
  }))
  const { name, priceRange, brand, weight, pieces } = ingredient
  console.log(macros)
  return (
    <div>
      <h2>
        {name}
        <ShopListButton mode="ADD" object={ingredient} set="ingredients" />
        <Button
          variant="outline-warning"
          onClick={() => history.push(`/ainesosat/paivita/${name}`)}
        >
          Päivitä
        </Button>
        <DeleteIngredientButton ingredient={ingredient} />
      </h2>
      <hr />
      <h4>Pakkauksen yleistiedot</h4>
      <table>
        <tbody>
          <tr>
            <th>Hintahaarukka:</th>
            <td>
              {priceRange.min.toFixed(2)} € - {priceRange.max.toFixed(2)} €
            </td>
          </tr>
          <tr>
            <th>Brändi:</th>
            <td>{brand || '(puuttuu toistaiseksi)'}</td>
          </tr>
          <tr>
            <th>Paino:</th>
            <td>
              {weight !== null ? `${weight} g` : '(puuttuu toistaiseksi)'}
            </td>
          </tr>
          {pieces !== null && (
            <tr>
              <th>Kappaletta:</th>
              <td>{pieces}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <h4>Ravintoainetaulukko</h4>
      <table>
        {macros.map(m => (
          <tbody key={m.details.title}>
            <tr>
              <th>{m.details.title}</th>
            </tr>
            <tr>
              <StyledTh>100 grammassa:</StyledTh>
              <td>
                {m.data.in100g !== null
                  ? `${m.data.in100g} g`
                  : '(puuttuu toistaiseksi)'}
              </td>
            </tr>
            <tr>
              <StyledTh>koko pakkauksessa:</StyledTh>
              <td>
                {m.data.total !== null
                  ? `${m.data.total} g`
                  : '(puuttuu toistaiseksi)'}
              </td>
            </tr>
            {m.data.inOnePiece !== null && (
              <tr>
                <StyledTh>Yhdessä kappaleessa:</StyledTh>
                <td>{m.data.inOnePiece} g</td>
              </tr>
            )}
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default Ingredient
