import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, Button } from 'react-bootstrap';
import { useCart } from "../contexts/CartContext";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Container, Row } from "react-bootstrap";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [search, setSearch] = useState("");
  const { addToCart } = useCart(); 

  useEffect(() => {
    demoApi();
    fetchCategories();
  }, []);

  const demoApi = () => {
    axios.get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error(error));
  };

  const fetchCategories = () => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        setCategories(response.data);
      });
  };

  const filteredProductsBySearch = useMemo(() => {
    return filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, filteredProducts]);

  const applyFiltersAndSort = useCallback(() => {
    let updatedProducts = [...products];

    if (selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }
    setFilteredProducts(updatedProducts);
  }, [selectedCategory, sortOption, products]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [selectedCategory, sortOption, applyFiltersAndSort]);
  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return title;
  };
  return (
    <Container className="my-4">
      <Row className="mb-4 align-items-center justify-content-between">
        <div className="col-md-3 col-sm-6 col-xs-12">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3 col-sm-6 col-xs-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Row>
      <Row>
        {filteredProductsBySearch.map((product) => (
          <div className="mb-4 col-md-4 col-sm-6 col-xs-12" key={product.id}>
            <Card className="product-card mb-4">
              <Card.Img
                variant="top"
                src={product.image}
                className="product-image"
              />
              <Card.Body>
                <Card.Title className="product-card-title d-flex align-items-center fs-5 fw-700">
                  {truncateTitle(product.title)}
                </Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Link to={`/product/${product.id}`}>
                  <Button className="btnTheme1">Details</Button>
                </Link>
                <Button
                  className="btnTheme1 ms-3"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
