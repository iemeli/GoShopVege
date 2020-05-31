import { gql } from '@apollo/client'

export const GROCERYSTORE_DETAILS = gql`
  fragment GroceryStoreDetails on GroceryStore {
    name
    id
  }
`

export const ALL_GROCERYSTORES = gql`
  query {
    allGroceryStores {
      ...GroceryStoreDetails
    }
  }
  ${GROCERYSTORE_DETAILS}
`
