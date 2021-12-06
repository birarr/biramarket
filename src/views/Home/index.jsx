import { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../components/context'
import { Navbar } from '../../components/Navbar'
import './styles.css'

export const Home = () => {
  const { listItems, setListItems } = useContext(AppContext)
  const [newItems, setNewItems] = useState([])

  useEffect(() => {
    setNewItems(listItems)
    localStorage.setItem('items', JSON.stringify(listItems))
  }, [listItems])

  const removeProduct = useCallback(
    (e) => {
      e.preventDefault()
      const removedItem = e.target.parentNode.getAttribute('postId')
      const filteredList = listItems?.filter((item) => item !== removedItem)
      console.log(filteredList)
      setListItems(filteredList)
    },
    [listItems, setListItems]
  )

  var listProducts = JSON.parse(localStorage.getItem('items'))

  return (
    <div className="homeContainer">
      <div className="homeContent">
        <h1 className="contentTitle">Shooping list</h1>
        <div className="listContainer">
          <ul className="shoppingList">
            {listProducts
              ?.sort((first, second) => {
                return first.localeCompare(second)
              })
              .map((item) => {
                return (
                  <div postId={item} className="shoppingListItems">
                    <input type="checkbox" />
                    <li>{item}</li>
                    <button
                      onClick={(e) => removeProduct(e)}
                      className="deleteBtn"
                    >
                      X
                    </button>
                  </div>
                )
              })}
          </ul>
        </div>
      </div>
    </div>
  )
}
