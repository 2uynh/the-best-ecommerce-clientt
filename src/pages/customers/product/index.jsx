import React, { useState, useEffect } from 'react';
import './shop.css';
import { FaSearch } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productApi from "../../../services/products";
import cartApi from "../../../services/cart";
import { formatPriceVND } from "../../../utils/formatPriceVND"; // Import hàm format giá
import { message } from 'antd';
import ScrollToTop from '../../../utils/scrolltotop';
import categoryApi from '../../../services/categories';


const formatedCategoryName = (name) => {
  const names = {
    laptop: "Laptop",
    watch: "Đồng hồ",
    mouse: "Chuột",
    headphone: "Tai nghe",
    phone: "Điện thoại"
  }
  return names?.[name] || name
}

const Shop = () => {
  const [shop, setShop] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState({});
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  // Fetch danh mục và sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sản phẩm
        const productsResponse = await productApi.getAll();
        setShop(productsResponse.data);

        // Fetch danh mục (giả sử bạn có API lấy danh mục)
        const categoriesResponse = await categoryApi.getAll();
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm hoặc danh mục", error);
      }
    };

    fetchData();
    
  }, []);

  ScrollToTop()
  // Filter sản phẩm theo danh mục
  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  // Xử lý hiển thị chi tiết sản phẩm
  const detailPage = (product) => {
    setDetail(product);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
  };

  // Thêm sản phẩm vào giỏ hàng
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
      message.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ");
    }
  };

  
  const filteredProducts = shop.filter((product) => {
  const matchCategory = selectedCategory ? product.category_id === selectedCategory : true;
  const matchQuery = product.name.toLowerCase().includes(query.toLowerCase());
  return matchCategory && matchQuery;
});

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      {showDetail && (
        <div className="product_detail">
          <button className="close_btn" onClick={closeDetail}>
            <IoIosCloseCircle />
          </button>
          <div className="container">
            <div className="img_box">
              <img src={detail.image} alt={detail.name} />
            </div>
            <div className="info">
              <h4>{detail.category}</h4>
              <h2>{detail.name}</h2>
              <h3>{formatPriceVND(detail.price)}</h3> {/* Hiển thị giá với định dạng */}
              <p>{detail.description || 'Thông tin mô tả sản phẩm chưa có'}</p>
              <button onClick={() => handleAddToCart(detail)}>Thêm vào giỏ</button>
            </div>
          </div>
        </div>
      )}

      <div className="shop">
        <h2>SẢN PHẨM</h2>
        <div className="container">
          <div className="left_box">
            <div className="category">
              <div className="header">
                <h3>DANH MỤC</h3>
              </div>
              <div className="box">
                <ul>
                  {categories.map((category) => (
                    <li
                      key={category._id}
                      onClick={() => filterByCategory(category._id)}
                    >
                      #{formatedCategoryName(category.name)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="banner">
              <div className="img_box">
                <img src="image/poster6.jpg" alt="" />
              </div>
            </div>
          </div>

          <div className="right_box">
            <div className="banner">
              <div className="img_box">
                <img src="image/poster7.jpg" alt="" />
              </div>
            </div>
            
            <div className="product_box">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <FaSearch className="search-icon" />
              </div>

              <div className="product_container">
                {filteredProducts.map((curElm, index) => (
                  <div className="box" key={index}>
                    <div className="img_box">
                      <img src={curElm.image} alt={curElm.name} />
                    </div>
                    <div className="info">
                      <h3>{curElm.name}</h3>
                      <p>{formatPriceVND(curElm.price)}</p> 
                      <button className="btn" onClick={() => handleAddToCart(curElm)}>
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
