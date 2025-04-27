import React from 'react'
import './contact.css'
const Contact = () => {
  return (
    <>
        <div className='contact'>
            <div className='container'>
                <div className='form'>
                    <h2>Liên Hệ</h2>
                    <form method='post'>
                        <div className='box'>
                            <div className='label'>
                                <h4>Họ và tên</h4>
                            </div>
                            <div className='input'>
                                <input type='text' placeholder='Họ và tên' value='' name=''></input>
                            </div>
                        </div>

                        <div className='box'>
                            <div className='label'>
                                <h4>Địa chỉ Email</h4>
                            </div>
                            <div className='input'>
                                <input type='email' placeholder='Địa chỉ Email' value='' name=''></input>
                            </div>
                        </div>

                        <div className='box'>
                            <div className='label'>
                                <h4>Tin nhắn</h4>
                            </div>
                            <div className='input'>
                                <textarea type='text' placeholder='Tin nhắn' value='' name=''></textarea>
                            </div>
                        </div>

                        <button type='sublot'>Gửi</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Contact