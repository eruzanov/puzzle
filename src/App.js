import React, {Component} from 'react';
import get from 'lodash/get';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    let values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,false];
    const shuffleValues = [];

    while (values.length) {
      let index = Math.ceil(Math.random() * 10);
      if (index >= values.length) {
        index = 0;
      }
      shuffleValues.push(values[index]);
      values = values.filter((val, i) => i !== index);
    }
    const map = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    let index = 0;
    this.state = {
      map : map.map(row => row.map(() => shuffleValues[index++]))
    }
  }

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
            <div key={row.length * i + j} className="puzzle" onClick={() => this.onClick(i, j)}>{el}</div> :
            <div key={row.length * i + j} className="puzzle-empty" onClick={() => this.onClick(i, j)}/>
          )
        })}
      </div>
    );
  }
}

export default App;
