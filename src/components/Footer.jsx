import React from 'react'
import './footer.css'
import { BsFillPiggyBankFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const Footer = () => {
  return (
    <>
        <div className='footer'>
            <div className='container'>
                <div className='left-box'>
                    <div className='box'>
                        <div className='icon_box'>
                            <BsFillPiggyBankFill />
                        </div>
                        <div className='detail'>
                            <h3>Tiết kiệm chi phí</h3>
                            <p>Mua thông minh - Giá luôn xinh</p>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='icon_box'>
                            <FaShippingFast />
                        </div>
                        <div className='detail'>
                            <h3>Dịch vụ giao hàng</h3>
                            <p>Không lo ship - Đặt là tới</p>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='icon_box'>
                            <TfiHeadphoneAlt />
                        </div>
                        <div className='detail'>
                            <h3>Hỗ trợ 24/7</h3>
                            <p>Trợ giúp nhanh - Phản hồi chuẩn</p>
                        </div>
                    </div>
                </div>
                <div className='right_box'>
                    <div className='header'>
                        <img src='image/logo_1.png' alt=''></img>
                        <p>Máy tính & công nghệ - Giao nhanh, giá chuẩn, bảo hành rõ ràng.</p>
                    </div>
                    <div className='bottom'>
                        <div className='box'>
                            <h3>Tài khoản</h3>
                            <ul>
                                <li>Về chúng tôi</li>
                                <li>Tài khoản của bạn</li>
                                <li>Thanh toán</li>
                                <li>Khuyến mãi</li>
                            </ul>
                        </div>
                        <div className='box'>
                            <h3>Sản phẩm</h3>
                            <ul>
                                <li>Vận chuyển</li>
                                <li>Theo dõi đơn</li>
                                <li>Sản phẩm mới</li>
                                <li>Sản phẩm cũ</li>
                            </ul>
                        </div>
                        <div className='box'>
                            <h3>Liên hệ</h3>
                            <ul>
                                <li>Khanh Hoa, U Minh, Ca Mau</li>
                                <li>(+84) 976 112 113</li>
                                <li>voanhquoc@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer