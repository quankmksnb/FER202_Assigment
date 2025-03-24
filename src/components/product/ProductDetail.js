import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Spinner, Card, Button, Container, Row, Col } from "react-bootstrap";
import { CartContext } from "../../context/CartContext";
import "./productdetail.css";


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);


  useEffect(() => {
    fetch(`http://localhost:9999/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-5">Không tìm thấy sản phẩm.</p>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="shadow">
            <Card.Img variant="top" src={product.image} alt={product.name} />
          </Card>
        </Col>
        <Col md={5}>
          <Card className="p-3 shadow">
            <Card.Body>
              <Card.Title className="fw-bold fs-4">{product.name}</Card.Title>
              <Card.Text className="text-danger fw-bold fs-5">Giá: ${product.price}</Card.Text>
              <Card.Text>
                <strong>Mô tả:</strong> {product.description}
              </Card.Text>
              <div className="d-flex">
                <Button
                  variant="danger"
                  className="me-2 btn-md shadow rounded-pill fw-bold px-3"
                >
                  🛒 Buy now
                </Button>
                <Button
                  variant="primary"
                  className="me-2 btn-md shadow rounded-pill fw-bold px-3"
                  onClick={() => addToCart(product)}
                >
                  ➕ Add to cart
                </Button>
                <Link to="/" className="btn btn-secondary btn-md shadow rounded-pill fw-bold px-3">
                  ⬅️ Quay Lại
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
