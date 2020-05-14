import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import {
  initShopList,
  addItem,
  removeItem,
  emptyShopList,
} from '../redux/shopListReducer'
import { setAlert } from '../redux/alertReducer'

// eslint-disable-next-line consistent-return
const useUpdateStore = mode => {
  const [initDone, setInitDone] = useState(false)
  const dispatch = useDispatch()

  switch (mode) {
    case 'INITSHOPLIST': {
      if (!initDone) {
        setInitDone(true)
        const currentShopList = Cookies.get('currentShopList')
        if (!currentShopList) {
          return Cookies.set('currentShopList', '[]')
        }
        return dispatch(initShopList(JSON.parse(currentShopList)))
      }
      break
    }

    case 'ADD': {
      const add = objectForStore => {
        let currentShopList = JSON.parse(Cookies.get('currentShopList'))
        currentShopList = currentShopList.concat(objectForStore)
        Cookies.set('currentShopList', JSON.stringify(currentShopList))
        dispatch(addItem(objectForStore))
        dispatch(setAlert('success', 'Lisätty ostoslistaan!'))
      }
      return add
    }

    case 'REMOVE': {
      const remove = objectForStore => {
        const currentShopList = JSON.parse(Cookies.get('currentShopList'))
        const filteredShopList = currentShopList.filter(
          o => o.objectId !== objectForStore.objectId
        )
        Cookies.set('currentShopList', JSON.stringify(filteredShopList))
        dispatch(removeItem(objectForStore))
        dispatch(setAlert('success', ''))
      }
      return remove
    }

    case 'EMPTY': {
      const empty = () => {
        Cookies.remove('currentShopList')
        dispatch(emptyShopList())
        setAlert('success', 'Ostoslista tyhjätty!')
      }
      return empty
    }
    default:
      break
  }
}

export default useUpdateStore
