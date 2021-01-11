import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, ListGroup } from "react-bootstrap";

const App = () => {
  const [value, setValue] = useState("");
  const [stationboard, setStationboard] = useState([]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  useEffect(() => {
    fetch(`http://transport.opendata.ch/v1/stationboard?id=${value}&limit=10`)
      .then((response) => response.json())
      .then(({ stationboard }) => {
        setStationboard(stationboard);
      });
  }, [value]);

  return (
    <Container className="my-5">
      <h1>Stationboard</h1>
      <Form.Control
        className="my-4"
        type="text"
        placeholder="Ort"
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
      />
      <ListGroup>
        {stationboard && stationboard.length > 0 ? (
          stationboard.map(
            ({ name, to, stop: { platform, departureTimestamp } }, index) => (
              <ListGroup.Item key={index} className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <p className="mb-0">{name}</p>
                  <p className="mb-0 font-weight-bold">Gleis {platform}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-0 font-weight-bold">{to}</p>
                  <p className="mb-0">{formatTimestamp(departureTimestamp)}</p>
                </div>
              </ListGroup.Item>
            )
          )
        ) : (
          <p>Dieser Ort wurde nicht gefunden.</p>
        )}
      </ListGroup>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
