import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // To store the response of the API
  const [data, setData] = useState([]);
  // To maintain the pagination
  const [start, setStart] = useState(0);
  const limit = 10;

  useEffect(function () {
    axios.post(" https://cashluck.xyz/api/v1/tasksfetch").then(function ({ data }) {
      let arr = [];
      for (let appId in data.data) {
        arr.push(data.data[appId]);
      }
      setData(arr);
    }).catch(function (err) {

    });
  }, []);

  /**
   * On click of next button, it increment start value and checks whether start value is not getting out of range and changes
   * the start state.
   */
  function next() {
    let new_start = start + 1;
    if (new_start * limit > data.length) return;
    setStart(new_start);
  }

  /**
   * On click of back button, it decrement start value and checks whether start value is not getting out of range and changes
   * the start state.
   */
  function back() {
    let new_start = start - 1;
    if (new_start < 0) return;
    setStart(new_start);
  }
  return (
    <div className="App">
      <table className="main-table">
        <thead>
          <tr>
            <th>APP ID</th>
            <th>IMAGE</th>
            <th>TASK NAME</th>
            <th>REWARD AMOUNT</th>
            <th>PAYOUT</th>
            <th>REVENUE</th>
            <th>TOATL CAPS</th>
            <th>COMPLETE CAPS</th>
            <th>DELETE</th>
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              index >= start * limit && index < ((start * limit) + limit) ?
                <tr key={item.appId}>
                  <td>{item.appId}</td>
                  <td><img src={item.appImageUrl} alt="" width="32px" height="32px" /></td>
                  <td>{item.appName}</td>
                  <td>{item.appRewardAmount}</td>
                  <td>₹ {item.payout}</td>
                  <td>₹ {item.revenue}</td>
                  <td>{item.totalcap}</td>
                  <td>{item.completecaps}</td>
                  <td><img src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png" alt="delete" width="14px" /></td>
                  <td><img src="https://img.icons8.com/material/24/000000/pencil--v2.png" alt="" width="16px" /></td>
                </tr> : <tr key={item.appId}></tr>)
          })}
        </tbody>
      </table>
      <div className="pagination">
        <div>
          {start * limit + 1}-{start * limit + limit > data.length ? data.length : start * limit + limit} of {data.length}
        </div>
        <div onClick={back}>
          <img src="https://img.icons8.com/material-rounded/24/000000/back--v1.png" alt="" width="20px" style={{ opacity: start - 1 < 0 ? "0.5" : "1" }} />
        </div>
        <div onClick={next}>
          <img src="https://img.icons8.com/material-rounded/24/000000/back--v1.png" alt="" width="20px" style={{ transform: "rotateZ(180deg)", opacity: ((start + 1) * limit > data.length) ? "0.5" : "1"  }} />
        </div>
      </div>
    </div>
  );
}

export default App;
