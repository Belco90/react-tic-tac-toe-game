import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );

}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }


  renderSquare(pos) {
    return (
      <Square
        value={this.state.squares[pos]}
        onClick={() => this.handleClick(pos)}
      />
    );
  }

  handleClick(pos) {
    const squaresCopy = this.state.squares.slice();

    if (calculateWinner(squaresCopy) || squaresCopy[pos]) {
      return;
    }

    squaresCopy[pos] = this.getCurrentPlayer();

    this.setState({
      squares: squaresCopy,
      xIsNext: !this.state.xIsNext,
    });
  }

  getCurrentPlayer() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  getStatus() {
    const winner = calculateWinner(this.state.squares);

    if (winner) {
      return 'Winner: ' + winner;
    }

    return 'Next player: ' + this.getCurrentPlayer();
  }

  render() {
    let status = this.getStatus();

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }


  return null;
}