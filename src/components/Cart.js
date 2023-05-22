import { Offcanvas, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useContext } from "react";
import CandyContext from "../Store/candyContext";

const Cart = () => {
  const [show, setShow] = useState(false);
  const ctx = useContext(CandyContext);
  console.log(ctx.items);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalItems = ctx.items.reduce((accumulator, currentValue) => {
    return (
      accumulator + currentValue.Msize + currentValue.Ssize + currentValue.Lsize
    );
  }, 0);

  return (
    <>
      <Button
        className="position-absolute top-0 end-0 me-5 mt-5"
        variant="primary"
        onClick={handleShow}
      >
        Cart <span>{totalItems}</span>
      </Button>
      <Offcanvas
        scroll={true}
        backdrop={false}
        show={show}
        placement="end"
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {ctx.items.map((item) => (
            <Row
              key={Math.random()}
              className="border-bottom mb-3 pb-1 align-items-center"
            >
              <Col className="d-flex flex-column">
                <span>{item.name}</span>
                <span> {item.description}</span>
              </Col>

              <Col lg={5}>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">
                    L <span className="border px-1">{item.Lsize}</span>{" "}
                  </span>
                  <span className="fw-bold">
                    {" "}
                    M <span className="border px-1">{item.Msize}</span>{" "}
                  </span>
                  <span className="fw-bold">
                    {" "}
                    S <span className="border px-1">{item.Ssize}</span>{" "}
                  </span>
                </div>
              </Col>
              <Col className="d-flex">
                <span className="mx-auto">{`$${item.price}`}</span>
              </Col>
            </Row>
          ))}

          <div className="mt-5 d-flex justify-content-end">
            <h5 className="pe-4">Total Price</h5>
            <h5>{`$${ctx.totalPrice}`}</h5>
          </div>
          <div className="d-flex justify-content-end mt-2">
            <Button className="me-3">Cancel</Button>
            <Button>Place Order</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
