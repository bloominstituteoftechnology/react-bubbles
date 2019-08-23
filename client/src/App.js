import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios'
import { axiosWithAuth } from './utils/axiosWithAuth'
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App(props) {
  
  const [colorList, setColorList] = useState([]);

 const submitUser = user => { 

    axios
      .post('http://localhost:5000/api/login', user)
      .then(rez => {
        localStorage.setItem('token', rez.data.payload)
        props.history.push('/bubbles')
      })
      .catch(rez => console.error(rez))

  }
  const grabColor = _ => {

    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => setColorList(res.data))
      .catch(err => console.error(err))

  }

  const addColor = color => {

    axiosWithAuth()
      .post('http://localhost:5000/api/colors', color)
      .then(rez => setColorList(rez.data))
      .catch(err => console.error(err))

  }

  const updateColor = color => {

    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${color.id}`, color)
      .then(res => setColorList(res.data))
      .catch(err => console.error(err))

  }

  const delColor = id => {

    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${id}`)
      .then(rez => setColorList(rez.data))
      .catch(err => console.error(err))

  }
  return (
    <Router>
      <div className="App">
              <Switch>

        <Route   
        exact path='/'
            render={props =>
              <Login
                {...props}
                submitUser={submitUser}
              />}
               />

                <Route
            path='/users'
            render={props => <BubblePage
              {...props}
              grabColor={grabColor}
              addColor={addColor}
              updateColor={updateColor}
              delColor={delColor}
              colorList={colorList}
            />}
          />

        </Switch>

        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
