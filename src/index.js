import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClickCb}>
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
        onClickCb={() => this.props.onClickCb(pos)}
      />
    );
  }
}

class Move extends React.Component {
  render() {
    let desc = this.getDescription();

    return (
      <li>
        <a href="#" onClick={() => this.props.onClickCb(this.props.move)}>{desc}</a>
      </li>
    )
  }

  getDescription() {
    if (this.props.move) {
      return 'Move #' + this.props.move;
    }

    return 'Game start';
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    let status = this.getStatus(current.squares);

    const moves = this.state.history.slice(0, this.state.stepNumber +1)
      .map((squares, idx) => {return this.renderMove(squares, idx)});

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClickCb={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  renderMove(step, move) {
    return (
      <Move
        key={move}
        move={move}
        step={step}
        onClickCb={(i) => this.jumpTo(i)}
      />
    );
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
    const historyCopy = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = historyCopy[historyCopy.length - 1];
    const squaresCopy = current.squares.slice();

    if (calculateWinner(squaresCopy) || squaresCopy[pos]) {
      return;
    }

    squaresCopy[pos] = this.getCurrentPlayer();

    this.setState({
      history: historyCopy.concat([{squares: squaresCopy}]),
      stepNumber: historyCopy.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      history: this.state.history.slice(0, this.state.stepNumber),
      stepNumber: step,
      xIsNext: (!(step % 2)),
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