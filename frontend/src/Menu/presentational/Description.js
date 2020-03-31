import React from 'react'
import { FOOD_ADDED } from '../../Food/queries'
import {
  useSubscription, 
} from '@apollo/client'

const Description = () => {
  useSubscription(FOOD_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('Descin subi')
    }
  })
  return (
  <div>
    <h1>GoShopVege</h1>
    <h3>Kauppalistasovellus vegaaneille</h3>
    <p>"Hmm. Nälkä on. Kauppaan pitäisi mennä.
      Mitähän sieltä voisi ostaa? Pitäisikö tehdä
      kauppalista ensin vai mennä fiiliksen mukaan?"
    </p>
    <p>GoShopVege on kaikille jotka haluavat ostaa kaupasta
      fiksusti kerralla useamman päivän ostokset. Valitse
      vain kauppa (työn alla) jossa käyt, ja luo tai valitse
      itsellesi valmiista ruokapaketeista, jotka luovat
      sinulle valmiin kauppalistan. 
    </p>
  </div>
)}

export default Description