import React, { useState } from 'react'
import './shop.css'
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import Homeproduct from '../../../mock-data/home_product';
const Shop = () => {
    const shop = Homeproduct
    const allcatefiller = () => {}
    const Filter = () => {}
    const addtocart = () => {}
    const [showDetail, setShowDetail] = useState(false)

    const [detail, setDetail] = useState([])
    
    const detailpage = (product) => {
        const detaildata = ([{product}])
        const productdetail = detaildata[0]['product']
        // console.log(productdetail)
        setDetail(productdetail)
        setShowDetail(true)
    }


    const closedetail = () => {
        setShowDetail(false)
    }
    return (
    <>
    {
        showDetail ? 
        <>
            <div className='product_detail'>
                <button className='close_btn' onClick={closedetail}><IoIosCloseCircle /></button>
                <div className='container'>
                    <div className='img_box'>
                        <img src={detail.image} alt=''></img>
                    </div>
                    <div className='info'>
                        <h4> {detail.cat}</h4>
                        <h2> {detail.Name}</h2>
                        <h3> {detail.price}đ</h3>
                        <p>sp nay k phai la thuoc va k co tac dung thay the thuoc chua benh!!!</p>
                        <button >Thêm vào giỏ</button>
                    </div>
                </div>
            </div>
        </>
        : null
    }
        <div className='shop'>
            <h2># SẢN PHẨM</h2>
            <p>Trang chủ .Sản phẩm</p>
            <div className='container'>
                <div className='left_box'>
                    <div className='category'>
                        <div className='header'>
                            <h3>DANH MỤC</h3>
                        </div>
                        <div className='box'>
                            <ul>
                                <li onClick={() => allcatefiller ()}># Tất cả</li>
                                <li onClick={() => Filter ("laptop")}># Laptop</li>
                                <li onClick={() => Filter ("headphone")}># Headphone</li>
                                <li onClick={() => Filter ("tablet")}># Máy tính bảng</li>
                                <li onClick={() => Filter ("mouse")}># Chuột</li>
                                <li onClick={() => Filter ("speaker")}># Loa</li>
                                <li onClick={() => Filter ("camera")}># Camera</li>
                            </ul>
                        </div>
                    </div>
                    <div className='banner'>
                        <div className='img_box'>
                            <img src='image/poster6.jpg'></img>
                        </div>
                    </div>
                </div>
                <div className='right_box'>
                    <div className='banner'>
                        <div className='img_box'>
                            <img src='image/poster7.jpg' alt=''></img>
                        </div>
                    </div>
                    <div className='product_box'>
                        <h2>SẢN PHẨM</h2>
                        <div className='product_container'>
                            {
                                shop?.map((curElm) =>{
                                    return (
                                        <>
                                            <div className='box'>
                                                <div className='img_box'>
                                                    <img src={curElm.image} alt=''></img>
                                                    <div className='icon'>
                                                        <li onClick={() => detailpage (curElm)}><FaEye /></li>
                                                        <li><FaHeart /></li>
                                                    </div>
                                                </div>
                                                <div className='detail'>
                                                    <h3>{curElm.Name}</h3>
                                                    <p id='mau'>{curElm.price}đ</p>
                                                    <button onClick={() => addtocart (curElm)}>Thêm vào giỏ</button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Shop