import { useApolloClient } from '@apollo/client'

const useUpdateCache = (collection, query) => {
  const client = useApolloClient()

  const includedIn = (set, object) => set.map(i => i.id).includes(object.id)

  const update = addedObject => {
    const dataInStore = client.readQuery({ query })
    console.log('täs dataInStore', dataInStore)

    if (!includedIn(dataInStore[collection], addedObject)) {
      client.writeQuery({
        query,
        data: {
          [collection]: dataInStore[collection].concat(addedObject),
        },
      })
    }
  }

  return update
}

export default useUpdateCache
