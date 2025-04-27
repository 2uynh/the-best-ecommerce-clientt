import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { FaEye, FaHeart, FaFacebook } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { SiZalo } from "react-icons/si";
import productApi from "../../../services/products";

const Home = () => {
  const addtocart = () => {};
  const [trendingProduct, setTrendingProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await productApi.getFeatured();
      const data = response.data;
console.log(data)
      setAllProducts(data);
      setTrendingProduct(data)
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const filtercate = (type) => {
    const filtered = allProducts.filter((product) => product.featured_type === type);
    setTrendingProduct(filtered);
  };

  const allTrendingProduct = () => {
    setTrendingProduct(allProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home">
      {/* giữ nguyên toàn bộ giao diện, chỉ sửa đoạn map trendingProduct */}
      <div className="top_banner">
        <div className="contant">
          <h3>TƯNG BỪNG SALE</h3>
          <h2>M1 MACBOOK AIR</h2>
          <p>Giảm 30% cho đơn hàng đầu tiên của bạn</p>
          <Link to="/shop" className="link">
            MUA NGAY
          </Link>
        </div>
      </div>

      <div className="trending">
        <div className="container">
          <div className="left_box">
            <div className="header">
              <div className="heading">
                <h2 onClick={allTrendingProduct}>SẢN PHẨM NỔI BẬT</h2>
              </div>
              <div className="cate">
                <h3 onClick={() => filtercate("new")}>MỚI</h3>
                <h3 onClick={() => filtercate("trend")}>XU HƯỚNG</h3>
                <h3 onClick={() => filtercate("top")}>BÁN CHẠY</h3>
              </div>
            </div>

            <div className="product">
              <div className="container">
                {trendingProduct.map((curElm) => (
                  <div className="box" key={curElm._id}>
                    <div className="img_box">
                      <img src={curElm.image} alt="" />
                      <div className="icon">
                        <div className="icon_box">
                          <FaEye />
                        </div>
                        <div className="icon_box">
                          <FaHeart />
                        </div>
                      </div>
                    </div>
                    <div className="info">
                      <h3>{curElm.name}</h3>
                      <p>{curElm.price}đ</p>
                      <button className="btn" onClick={() => addtocart(curElm)}>
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/shop">
                <button>Hiển thị thêm</button>
              </Link>
            </div>
          </div>

          <div className="right_box">
            <div className="right_container">
              <div className="testimonial">
                <div className="head">
                  <h3>NGƯỜI ĐẠI DIỆN</h3>
                </div>
                <div className="detail">
                  <div className="img_box">
                    <img src="image/avatar.jpg" alt="testmonial" />
                  </div>
                  <div className="info">
                    <h3>Võ Anh Quốc</h3>
                    <h4>Giám Đốc</h4>
                    <p>
                      Người Hỗ trợ & chịu trách nhiệm đối với Ánh Nguyệt
                      Computer
                    </p>
                  </div>
                </div>
              </div>

              <div className="newsletter">
                <div className="head">
                  <h3>Liên hệ</h3>
                </div>
                <div className="form">
                  <p>Nhập số điện thoại hoặc email của bạn để được hỗ trợ!</p>
                  <input type="email" placeholder="E-mail" autoComplete="off" />
                  <button>Gửi</button>
                  <div className="icon_box">
                    <div className="icon">
                      <FaFacebook />
                    </div>
                    <div className="icon">
                      <BiLogoGmail />
                    </div>
                    <div className="icon">
                      <SiZalo />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="banners">
        <div className="container">
          <div className="left_box">
            <div className="box">
              <img src="image/poster3.jpg" alt="banner" />
            </div>
            <div className="box">
              <img src="image/poster5.jpg" alt="banner" />
            </div>
          </div>
          <div className="right_box">
            <div className="top">
              <img src="image/poster4.jpg" alt="" />
              <img src="image/poster1.jpg" alt="" />
            </div>
            <div className="bottom">
              <img src="image/poster2.jpg" alt="banner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
