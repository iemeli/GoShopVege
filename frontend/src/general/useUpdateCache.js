import { useApolloClient } from '@apollo/client'

const useUpdateCache = (collection, query, mode) => {
  const client = useApolloClient()

  const includedIn = (set, object) => set.map(i => i.id).includes(object.id)

  const updateCacheWith = object => {
    const dataInStore = client.readQuery({ query })

    if (!includedIn(dataInStore[collection], object) || mode === 'DELETE') {
      let data
      switch (mode) {
        case 'ADD':
          data = dataInStore[collection].concat(object)
          break
        case 'DELETE':
          data = dataInStore[collection].filter(o => o.id !== object.id)
          break
        case 'UPDATE':
          data = dataInStore[collection].map(o =>
            o.id === object.id ? object : o
          )
          break
        default:
          break
      }
      client.writeQuery({
        query,
        data: {
          [collection]: data,
        },
      })
    }
  }

  return updateCacheWith
}

export default useUpdateCache
