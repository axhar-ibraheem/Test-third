import { useContext, useState } from "react";
import CandyContext from "../Store/candyContext";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
const Candies = (props) => {
  const ctx = useContext(CandyContext);
  const [largeShoes, setLargeShoes] = useState(props.Lsize);
  const [mediumShoes, setMediumShoes] = useState(props.Msize);
  const [smallShoes, setSmallShoes] = useState(props.Ssize);

  const addOneToCart = async () => {
    const response = await fetch(
      "https://crudcrud.com/api/a3c73fd05f4940fa8fcc2c61a4e731cb/cart",
      {
        method: "POST",
        cors: "no-cors",
        body: JSON.stringify({
          ...props,
          size: "large",
          Lsize: 1,
          Ssize: 0,
          Msize: 0,
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

    ctx.addItem({
      ...props,
      size: "large",
      Lsize: 1,
      Ssize: 0,
      Msize: 0,
    });
    setLargeShoes((preState) => preState - 1);
  };
  const addTwoToCart = async () => {
    const response = await fetch(
      "https://crudcrud.com/api/a3c73fd05f4940fa8fcc2c61a4e731cb/cart",
      {
        method: "POST",
        cors: "no-cors",
        body: JSON.stringify({
          ...props,
          size: "medium",
          Lsize: 0,
          Ssize: 0,
          Msize: 1,
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
    ctx.addItem({
      ...props,
      size: "medium",
      Lsize: 0,
      Ssize: 0,
      Msize: 1,
    });
    setMediumShoes((preState) => preState - 1);
  };
  const addThreeToCart = async () => {
    const response = await fetch(
      "https://crudcrud.com/api/a3c73fd05f4940fa8fcc2c61a4e731cb/cart",
      {
        method: "POST",
        cors: "no-cors",
        body: JSON.stringify({
          ...props,
          size: "small",
          Lsize: 0,
          Ssize: 1,
          Msize: 0,
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

    ctx.addItem({
      ...props,
      size: "small",
      Lsize: 0,
      Ssize: 1,
      Msize: 0,
    });
    setSmallShoes((preState) => preState - 1);
  };

  return (
    <ListGroup.Item>
      <Row>
        <Col lg={4} className="d-flex justify-content-between">
          <span> {props.name}</span>
          <span> {props.description}</span>
          <span>{`$${props.price}`}</span>
        </Col>
        <Col lg={6} className="d-flex justify-content-between">
          <Button
            onClick={addOneToCart}
            disabled={largeShoes === 0 ? true : false}
          >
            Buy Large {`(${largeShoes})`}
          </Button>
          <Button
            onClick={addTwoToCart}
            disabled={mediumShoes === 0 ? true : false}
          >
            Buy Medium {`(${mediumShoes})`}
          </Button>
          <Button
            onClick={addThreeToCart}
            disabled={smallShoes === 0 ? true : false}
          >
            Buy Small {`(${smallShoes})`}
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default Candies;
