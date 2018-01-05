import React, {Component} from 'react';
import get from 'lodash/get';
import './App.css';

class App extends Component {
  state = {
    map: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, false]
    ]
  };

  findEmpty(i, j) {
    switch (false) {
      case get(this.state.map, `[${i + 1}][${j}]`):
        return [i + 1, j];
      case get(this.state.map, `[${i - 1}][${j}]`):
        return [i - 1, j];
      case get(this.state.map, `[${i}][${j + 1}]`):
        return [i, j + 1];
      case get(this.state.map, `[${i}][${j - 1}]`):
        return [i, j - 1];
      default:
        return false;
    }
  }

  onClick = (i, j) => {
    const empty = this.findEmpty(i, j);
    if (empty) {
      const newMap = this.state.map.map(row => row.map(el => el));
      newMap[empty[0]][empty[1]] = newMap[i][j];
      newMap[i][j] = false;
      this.setState({map: newMap});
    }
  };

  render() {
    return (
      <div className="container-puzzle">
        {this.state.map.map((row, i) => {
          return row.map((el, j) => el ?
            <div key={el} className="puzzle" onClick={() => this.onClick(i, j)}>{el}</div> :
            <div key={el} className="puzzle-empty" onClick={() => this.onClick(i, j)}/>
          )
        })}
      </div>
    );
  }
}

export default App;
