import './App.css';
import { useState } from 'react';
import axios from "axios";
import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const counterState = atom({
  key: 'data',
  default: {},
  effects_UNSTABLE: [persistAtom],
})

const API_KEY= process.env.REACT_APP_API_KEY
// const API_KEY= "b18897cde8ccb1b67e307d4430a778e8"
function App() {

  const [data, setdata] = useRecoilState(counterState)
  // const [data, setdata] = useState({})
  const [location, setlocation] = useState("")
  
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    // https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=b18897cde8ccb1b67e307d4430a778e8
    const searchLocation =(event)=>{
      if (event.key=== "Enter") {
        axios.get(url)
        .then((response) => {
          setdata(response.data)
          // console.log(response.data);
          setlocation("");
          
        })
      }
      
   
  
  
   
    
    }
  
  return (

   <section className="well">
     <div className="app">
      {/* search section */}
      <div className="inp">
        {/* <form action="" method="get"> */}
          <label htmlFor="search"></label>
          <input placeholder='Type city' className='input'
           value={location}  onChange={event => setlocation(event.target.value)} 
           onKeyPress={searchLocation} 
            type="text" name="search" id="" />
        {/* </form> */}
      </div>
      <div className='container'>
        {/* this is the top of the app */}
      <div className="top">
     
        <div className="top1">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="tempe">
          {data.main ? <h1 className='ball'>{data.main.temp.toFixed()}&#8451;</h1> :null}
           {/* <p>{data.main.temp}</p> */}
        </div>
        </div>
    <div className="top2">
    <div className="description">
    {data.main ? <h1>{data.weather[0].main}</h1> :null}
        {/* <p>{data.weather.main}</p> */}
      </div>
    </div>
      </div>
      {/* this is the end of the top */}
      {/* {data.main !==undefined &&} */}

      {/* this is the bottom of the app */}
      <div className="bottom">
      <div className="content">
        <div className="temp">
          <p>Pressure</p>
          {/* <h4>feels like</h4> */}
           {/* <p>37&#8451;</p> */}
           {data.main ? <h1 className='info'>{data.main.pressure}mmHg</h1> :null}
        
         
        </div>
      </div>
      <div className="content">
        <div className="temp">
          <p>Humidity</p>
          {/* <h4>feels like</h4> */}
          {data.main ? <h1 className='info'>{data.main.humidity}&#8451;</h1> :null}
         
         
        </div>
      </div>
      <div className="content">
        <div className="temp">
          <p>Wind Speed</p>
          {/* <h4>feels like</h4> */}
          {data.main ? <h1 className='info'>{data.wind.speed}mph</h1> :null}
         
          
        </div>
      </div>
      </div>

      {/* this is the end of the bottom */}
    </div>

    </div>
    </section>
  );
}


export default App;
