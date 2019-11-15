import React from "react";
// import axios from 'axios';

const initialLogin= {

  username: '',
  password: ''
}



const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [loginA, setLoginA] = useState(initialLogin);
  const changeHandler = e => {
    e.persist();
    let value = e.target.value;

    setLoginA({
      ...loginA,
      [e.target.name]: value
    });
  };

  useEffect(() => {
  
      axios
      // .get(`http://localhost:5000/api/${props.match.params.id}`)
      .then(res => setLoginA(res.data))
      .catch(err => console.log(err.response));
      //  console.log()

  }, [ props.match.params.id]);

  const handleSubmit = e => {
    // PUT request
    e.preventDefault();
    //console.log()
    axios
      // .put(`http://localhost:5000/api/${movie.id}`, movie)
      
      .then(res => {  
        props.history.push('/');
      })
      .catch(err => console.log(err));
  };




  return (

    <div  className='LoginForm'>

    <h1>Welcome to the Bubble App!</h1>
    {/* <p>Build a login page here</p> */}
    
    <form onSubmit={handleSubmit}>
      <input className='input'
        type="text"
        name="username"
        onChange={changeHandler}
        placeholder="Username"
        value={loginA.username}
      />

      <input className='input'
        type="text"
        name="password"
        onChange={changeHandler}
        placeholder="Password"
        value={loginA.password}
      />


      </form>

      </div>
      

    
    
  );
};

export default Login;
