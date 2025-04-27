import React from 'react'
import './cart.css'
import { BrowserRouter } from 'react-router-dom'
import { IoTrashBinSharp } from "react-icons/io5";

import { Link } from 'react-router-dom'
const Cart = ({cart, setCart}) => {
  const incqty = (product) => {
    const exist = cart.find((x) => {
        return x.id === product.id
    })
    setCart(cart.map((curElm) => {
        return curElm.id === product.id ? {...exist, qty: exist.qty + 1} : curElm
    }))
  }  

  const decqty = (product) => {
    const exist = cart.find((x) => {
        return x.id === product.id
    })
    setCart(cart.map((curElm) => {
        return curElm.id === product.id ? {...exist, qty: exist.qty - 1} : curElm
    }))
  }

  const removeproduct = (product) => {
    const exist = cart.find((x) => {
        return x.id === product.id
    })
    if (exist.qty > 0) {
        setCart(cart.filter((curElm) => {
            return curElm.id !== product.id
        }))
    }
  }

  const total = cart.reduce((price, item) => {
    const numericPrice = Number(item.price.toString().replace(/,/g, ''))
    return price + item.qty * numericPrice
  }, 0).toLocaleString()
  

  return (
    <>
    <div className='cart'>
        <h3># Giỏ hàng</h3> {
            cart.length === 0 && <>
            <div className='emty_cart'>
                <h2>Giỏ hàng của bạn đang trống!</h2>
                <Link to='/shop'><button>Mua sắm ngay</button></Link>
                
            </div>
            </>
        }
        <div className='container'>
            {
                cart.map((curElm) => {
                    return(
                        <>
                        <div className='box'>
                            <div className='img_box'>
                                <img src={curElm.image} alt=''></img>
                            </div>
                            <div className='detail'>
                                <div className='info'>
                                    <h4>{curElm.cat}</h4>
                                    <h3>{curElm.Name}</h3>
                                    <p>Price: {Number(curElm.price.replace(/[^\d]/g, '')).toLocaleString()}đ</p>
                                    <p>TỔNG: {(Number(curElm.price.replace(/[^\d]/g, '')) * curElm.qty).toLocaleString()}đ</p>
                                </div>
                                <div className='quality'>
                                    <button onClick={() =>incqty (curElm)}>+</button>
                                    <input type='number' value={curElm.qty}></input>
                                    <button onClick={() =>decqty (curElm)}>-</button>
                                </div>
                                <div className='icon'>
                                    <li onClick={() => removeproduct(curElm)}><IoTrashBinSharp /></li>
                                </div>
                            </div>
                        </div>
                        </>
                    )
                })
            }
        </div>
        <div className='bottom'>
            {
                cart.length > 0 &&
                <>
                    <div className='total'>
                        <h4>Tổng: {total}đ</h4>
                    </div>
                    <button>Thanh toán</button>
                </>
            }
        </div>
    </div>
    </>
  )
}

export default Cart