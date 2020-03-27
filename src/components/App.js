import React from 'react';
import { Client } from 'boardgame.io/react';
import { SERVER_PORT } from '../constants';
import {TicTacToe} from "../game/game";
import {TicTacToeBoard} from "./board";
import {SocketIO} from "boardgame.io";

const url = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '');

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  debug: false,
  multiplayer: SocketIO({
    server: (process.env.NODE_ENV === 'production') ? `${url}` : `${window.location.hostname}:${SERVER_PORT}`
  }),
});

class App extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    this.state = {
      game: params.game,
      id: params.id,
      secret: params.secret,
    };
  }

  render() {
    return (
      <div className="player-container">
        <TicTacToeClient gameID={this.state.game} credentials={this.state.secret} playerID={this.state.id + ''} />
      </div>
    );
  }
}

export default App;