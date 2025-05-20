import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { SiZalo } from "react-icons/si";
import productApi from "../../../services/products";
import { toast } from "react-toastify";
import cartApi from "../../../services/cart";
import { formatPriceVND } from "../../../utils/formatPriceVND";
import { message } from "antd";

const Home = () => {
  const [trendingProduct, setTrendingProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  const fetchProducts = async () => {
    try {
      const response = await productApi.getFeatured();
      const data = response.data;
      console.log(data);
      setAllProducts(data);
      setTrendingProduct(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleAddToCart = async (product) => {
    if (!user?.id || !product?._id) {
      return message.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ");
    }
    try {
      await cartApi.addToCart({
        user_id: user.id,
        product_id: product._id,
        quantity: 1,
      });
      message.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      message.error("Đã xảy ra lỗi");
    }
  };

  const filtercate = (type) => {
    const filtered = allProducts.filter(
      (product) => product.featured_type === type
    );
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
      <div className="top_banner">
        <div className="contant">
          <h3>NHANH TAY MUA NGAY</h3>
          <h2>MACBOOK AIR M2</h2>
          <p>Mua thông minh - giá luôn xinh</p>
          <Link to="/product" className="link">
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
                    </div>
                    <div className="info">
                      <h3>{curElm.name}</h3>
                      <p>{formatPriceVND(curElm.price)}</p>
                      <button
                        className="btn"
                        onClick={() => handleAddToCart(curElm)}
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/product">
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
                    <h3>Phạm Hoàng Mãi</h3>
                    <h4>Giám Đốc Điều Hành</h4>
                    <p>
                      Người Hỗ trợ & chịu trách nhiệm đối với Trường Thịnh
                      Computer
                    </p>
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
