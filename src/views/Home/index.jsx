import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../components/context'
import { Navbar } from '../../components/Navbar'
import './styles.css'

export const Home = () => {
  const mockedList = ['arroz', 'banana', 'leite', 'granola', 'feijão', 'açucar']

  const { listItems } = useContext(AppContext)
  const [newItems, setNewItems] = useState([])

  useEffect(() => {
    setNewItems(listItems)
  }, [listItems])

  console.log({ newItems })

  return (
    <div className="homeContainer">
      <Navbar />
      <div className="homeContent">
        <h1 className="contentTitle">Shooping list</h1>
        <div>
          <ul className="shoppingList">
            {listItems.map((item) => {
              return (
                <div className="shoppingListItems">
                  <input className="checkbox" type="checkbox" />
                  <li>{item}</li>
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
