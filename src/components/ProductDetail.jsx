import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import "swiper/css";
import '../App.css';


const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [id]);


  if (!product) return <div>Loading...</div>;

  const handleGoToCart = () => {
    addToCart(product);

    navigate("/cart", { state: { product } });
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-image"
            style={{ maxWidth: "100%", height: "250px", maxHeight: "100%" }}
          />
        </Col>
        <Col md={6} className="my-4">
          <h4 style={{ fontSize: "22px", fontWeight: "600" }}>{product.title}</h4>
          <p style={{ fontSize: "17px", fontWeight: "400" }}>{product.description}</p>
          <h4 style={{ fontSize: "20px", fontWeight: "600" }}>${product.price}</h4>
          <div className="d-flex justify-content-start align-items-center gap-3">
            <Button className="btnTheme" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
            <Button className="btnTheme1" variant="primary" onClick={handleGoToCart}>
              Go To Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;