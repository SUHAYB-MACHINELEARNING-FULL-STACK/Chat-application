import {useState} from 'react';
import axios from 'axios';
import './Login.css';
import Slack from './chat.png';
import App from './App';
function Login() {
    const [email, setEmail]=useState('')
    const [pass, setPass]=useState('')
    const [username, setUsername]=useState('')
    const [checknumber, setChecknumber]=useState('')
    const [logined, setLogined]=useState(false)
    const [success, setSuccess]=useState([undefined,undefined])
    const LogIn=()=>{
        axios.put('http://localhost:7800/Login', {email,pass})
             .then((response)=>{setLogined(true); setSuccess([true,response.data.message]);
                setUsername(response.data._doc.Username);
                console.log(response.data) /*setLogined(true);*/ })
             .catch((err)=>{console.log(err.response.data.message); setSuccess([false,err.response.data.message]); console.log(0)})
    }
    return (
        logined?<App username={username} />:(<>
            <div className="Login">
                <div align="center">
                    <img src={Slack} width="100"/>
                    <h1 className="Tell_me">Tell_me</h1>
                </div>
                <div align="center">
                {success[0]?<div class="alert alert-success" role="alert">
  {success[1]}
</div>:success[0]===false?<div class="alert alert-danger" role="alert">
  {success[1]}
</div>:''}
                <div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">Email</span>
  <input type="email" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">Password</span>
  <input type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"  onChange={(e)=>{setPass(e.target.value)}}/>
                </div>
                    {/*<input type="email" placeholder="Type Your email here..." />
                    <input type="password" placeholder="Type email password here..." />*/}
                    <div>
                        <a href="#"><label>I agree for Terms of use!</label></a>
                    </div>
                    </div>
                    <div align="center">
                        <input type="submit" value="Login" onClick={LogIn}/>
                    </div>
            </div>
        </>
    ));
}

export default Login;