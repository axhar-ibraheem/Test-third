import { Form, Button, Container, Row, Col } from "react-bootstrap";
import React, { useRef } from "react";
import userEvent from "@testing-library/user-event";
const CandyForm = (props) => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const largeRef = useRef();
  const mediumRef = useRef();
  const smallRef = useRef();
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const shoes = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: +priceRef.current.value,
      Lsize: +largeRef.current.value,
      Msize: +mediumRef.current.value,
      Ssize: +smallRef.current.value,
    };

    const response = await fetch(
      "https://crudcrud.com/api/a3c73fd05f4940fa8fcc2c61a4e731cb/products",
      {
        method: "POST",
        cors: "no-cors",
        body: JSON.stringify({
          ...shoes,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    }
    props.onAddCandy(shoes);
  };

  return (
    <Container className="mt-3">
      <Form onSubmit={onSubmitHandler} className="">
        <Row className="align-items-center">
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Shoe Brand</Form.Label>
              <Form.Control ref={nameRef} type="text" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control ref={descriptionRef} type="text" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control ref={priceRef} type="number" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 text-center" controlId="formBasicPrice">
              <Form.Label>Size</Form.Label>
              <div className="d-flex">
                <Form.Control ref={largeRef} type="number" placeholder="L" />
                <Form.Control ref={mediumRef} type="number" placeholder="M" />
                <Form.Control ref={smallRef} type="number" placeholder="S" />
              </div>
            </Form.Group>
          </Col>
          <Col>
            <Button className="mt-3" variant="primary" type="submit">
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CandyForm;
