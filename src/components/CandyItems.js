import { Container, ListGroup, Row, Col, Button } from "react-bootstrap";
import { useContext } from "react";
import CandyContext from "../Store/candyContext";
import Candies from "./Candies";
const CandyItems = (props) => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col className="border">
          <ListGroup variant="flush">
            {props.candies.map((item) => (
              <Candies
                name={item.name}
                price={item.price}
                description={item.description}
                Msize={item.Msize}
                Lsize={item.Lsize}
                Ssize={item.Ssize}
                key={Math.random()}
                id={item.name}
              />
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CandyItems;
