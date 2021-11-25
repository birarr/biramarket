import marketLogo from '../../assets/marketLogo3.png'

import './styles.css'

export const Header = () => {
  return (
    <div className="headerContainer">
      <div className="content">
        <h1 className="title">Your online shopping list</h1>
        <img src={marketLogo} className="logo" alt="logo" />
      </div>
    </div>
  )
}
