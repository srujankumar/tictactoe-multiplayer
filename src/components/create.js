import React from 'react';
import request from 'superagent';
import { Container, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Col, Row, Table, FormFeedback } from 'reactstrap';
import { API_PORT } from '../constants';
import _ from 'lodash';
import './create.css';

class Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      players: 2,
      gameID: "",
      names: {
        0: "Player 1",
        1: "Player 2",
      },
      secret: {
        0: "",
        1: "",
      },
      creating: false,
      created: false,
    };

    this.onNameUpdated = this.onNameUpdated.bind(this);
    this.createGame = this.createGame.bind(this);

    this.apiBase = (process.env.NODE_ENV === 'production') ? '/api' : `${window.location.protocol}//${window.location.hostname}:${API_PORT}`;
  }

  async createGame() {
    
    this.setState({
      ...this.state,
      creating: true,
    });

    const r = await request
      .post(`${this.apiBase}/create`)
      .send({
        players: this.state.players,
        names: this.state.names,
      });

    const gameId = r.body.game;

    for (var i=0; i<r.body.credentials.length; i++) {
      this.setState({
        ...this.state,
        secret: {
          ...this.state.secret,
          [i]: r.body.credentials[i],
        },
      });
    }

    this.setState({
      ...this.state,
      gameID: gameId,
      created: true,
    });
  }

  onNameUpdated(idx, e) {
    this.setState({
      ...this.state,
      names: {
        ...this.state.names,
        [idx]: e.target.value,
      }
    });
  }

  isFormValid() {
    for (var i=0; i<this.state.players; i++) {
      if (_.isEmpty(this.state.names[i])) {
        return false;
      }
    }
    return true;
  }

  render() {
    let createForm = <div />;
    let linkDisplay = <div />;
    if (!this.state.created) {
      createForm = (
        <div>
          <Form>
            {Array(this.state.players).fill(0).map((v, i) =>
              <FormGroup row key={i}>
                <Label for={`p${i}`} sm={2}>Name</Label>
                <Col sm={10}>
                  <Input autoComplete={"off"} type="text" invalid={_.isEmpty(this.state.names[i])} name={`p${i}`} id={`p${i}`} onChange={e => this.onNameUpdated(i, e)} value={this.state.names[i]} />
                  <FormFeedback>The name cannot be empty</FormFeedback>
                </Col>
              </FormGroup>
            )}
            <hr />
            <Button block size="lg" color="warning" disabled={this.state.creating || !this.isFormValid()} onClick={this.createGame}>Proceed</Button>
          </Form>
          <hr />
          <small className="text-muted">
            Players will be able to join the game with the links that are generated after you proceed.
          </small>
        </div>
      );
    } else {
      linkDisplay = (
        <div>
          <div className="text-center text-muted">
            <p>The following links should be distributed to the players respectively.</p>
          </div>
          <Table>
            <tbody>
            {Array(this.state.players).fill(0).map((v, i) => 
              <tr key={i}>
                <td>{this.state.names[i]}</td>
                <td>
                  <a href={`${window.location.origin}/${this.state.gameID}/${i}/${this.state.secret[i]}`}>{window.location.origin}/{this.state.gameID}/{i}/{this.state.secret[i]}</a>
                </td>
              </tr>
            )}
            </tbody>
          </Table>
          <hr />
          <div className="text-center">
            <small className="text-muted">
              These links are unique for each player and would allow them to join the game.
            </small>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Container className="create">
          <Row style={{paddingTop: "20px"}}>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Card>
                <CardHeader className="text-center">Tic Tac Toe</CardHeader>
                <CardBody>
                  {createForm}
                  {linkDisplay}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Create;