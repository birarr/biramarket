/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { useCallback, useEffect, useState, useContext } from 'react'
import { AppContext } from '../context'
import logoImg from '../../assets/marketLogo3.png'

import './styles.css'

export const Navbar = () => {
  const { setListItems, listItems } = useContext(AppContext)
  const db = getFirestore()
  const [products, setProducts] = useState([])
  const [value, setValue] = useState('')

  const productsRef = collection(db, 'products')
  const q = query(productsRef, orderBy('name', 'asc'))

  const fetchProducts = () => {
    getDocs(q).then((querySnapshot) => {
      const p = querySnapshot.docs.map((doc) => doc.data())
      setProducts(p)
    })
  }
  console.log({ listItems })
  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAddProduct = useCallback(
    (e) => {
      e.preventDefault()
      if (!value) {
        return alert('Item necessita ter um nome')
      }
      addDoc(productsRef, {
        name: value,
        createdAt: serverTimestamp(),
      })
        .then(() => {
          setValue('')
          console.log('Product add with successful')
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
    [productsRef, value]
  )

  const handleAddProductToShoppingList = (e) => {
    // setListItems(products)
    const productName = e.target.innerHTML.split(' ')
    console.log(productName[1], listItems)
    if (listItems.includes(productName[1])) {
      alert('Produto is already on the cart!')
      return
    }
    setListItems([...listItems, productName[1]])
  }

  return (
    <div className="navContainer">
      <img src={logoImg} alt="" />
      <h1 className="listTitle">Products list</h1>
      <form className="inputForm" onSubmit={handleAddProduct}>
        <input
          className="listInput"
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button className="inputButton" type="submit">
          Add
        </button>
      </form>
      <ul className="productsList">
        {products.map((product) => {
          return (
            <li key={product.name}>
              <a onClick={(e) => handleAddProductToShoppingList(e)}>
                + {product.name}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
