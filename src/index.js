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

  render() {
    return (
      <div>
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

  renderSquare(pos) {
    return (
      <Square
        value={this.props.squares[pos]}
        onClick={() => this.props.onClick(pos)}
      />
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
    };
  }

  render() {
    const current = this.getCurrentHistory();
    let status = this.getStatus(current.squares);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }

  getCurrentHistory() {
    let history = this.state.history;
    return history[history.length - 1];
  }

  getCurrentPlayer() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  getStatus(squares) {
    const winner = calculateWinner(squares);

    if (winner) {
      return 'Winner: ' + winner;
    }

    return 'Next player: ' + this.getCurrentPlayer();
  }

  handleClick(pos) {
    const current = this.getCurrentHistory();
    const squaresCopy = current.squares.slice();

    if (calculateWinner(squaresCopy) || squaresCopy[pos]) {
      return;
    }

    squaresCopy[pos] = this.getCurrentPlayer();

    this.setState({
      history: this.state.history.concat([{squares: squaresCopy}]),
      xIsNext: !this.state.xIsNext,
    });
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
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }


  return null;
}