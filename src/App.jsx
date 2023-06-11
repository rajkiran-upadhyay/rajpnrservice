import { useState } from 'react'
import axios from 'axios'

import './App.css'
let img = 'https://img-new.cgtrader.com/items/4231291/9a3404112e/vande-bharat-express-train-18-3d-model-9a3404112e.jpg';
function App() {
  const [n, sn] = useState("");
  const [pd, spd] = useState([])
  const [ps, sps] = useState([]);
  const [er, sEr] = useState("");
  const [e, sE] = useState(false);

  function handleChange(event) {
    sn(event.target.value)
  }

  function handleSubmit() {
    const options = {
      method: 'GET',
      url: 'https://irctc1.p.rapidapi.com/api/v3/getPNRStatus',
      params: {
        pnrNumber: n
      },
      headers: {
        'X-RapidAPI-Key': '5226518e4bmshf3cfd6789db8690p1ffbf0jsnd745014e2064',
        'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
      }
    };

    axios.request(options).then(response => {
      if (response.data.status === true) {
        spd(response.data.data)
        sps(response.data.data.PassengerStatus);
        sE(false);
        sEr("")
        sn("")

      } else {
        sE(true)
        sEr("Wrong PNR !")
      }
      // console.log(ps)

    })


  }


  return (
    <>
      <img src={img} style={{ height: 76, width: 180 }} alt='train' />
      <h1>Check Your <span className='hh'>PNR </span> Status</h1>
      <input type='text' style={{ margin: 8 }} value={n} onChange={handleChange} />
      <button className='hoi' type='submit' style={{ width: 100, height: 20, margin: 2, color: "white" }} onClick={handleSubmit}>Search</button>
      <span style={{ color: 'red' }}>{e && er}</span>
      <table border="1" style={{ fontSize: 6 }}>
        <thead>
          <tr >
            <th>PNR No</th>
            <th>Train No</th>
            <th>Train Name</th>
            <th>Source Station</th>
            <th>Source Station</th>
            <th>Journey Date</th>
          </tr>

        </thead>
        <tbody>
          <tr>
            <td>{pd.Pnr}</td>
            <td>{pd.TrainNo}</td>
            <td>{pd.TrainName}</td>
            <td>{pd.BoardingStationName}</td>
            <td>{pd.ReservationUptoName}</td>
            <td>{pd.SourceDoj}</td>
          </tr>
        </tbody>
      </table>
      <table border="1" style={{ fontSize: 6, marginTop: 9 }}>
        <thead >
          <tr >
            <th>Person No</th>
            <th>Berth</th>
            <th>Booking Status</th>
            <th>Current Status</th>
          </tr>

        </thead>
        <tbody>
          {ps.map((passenger, index) =>
            <tr key={index}>
              <td>{passenger.Number}</td>

              <td>{passenger.Berth}</td>
              <td>{passenger.BookingStatus}</td>
              <td>{passenger.CurrentStatus}</td>

            </tr>)}

        </tbody>
      </table>
      <br />
      <br />
      <br />
      <br />
      <p style={{ color: 'white', fontSize: 9 }}>Copyright &copy; 2023 | @Raj | All Rights Reserved.</p>
    </>
  )
}

export default App
