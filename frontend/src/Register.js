import {useState} from 'react';
import axios from 'axios';
import './Register.css';
import Slack from './chat.png';
import App from './App';
import Login from './Login';

export default function Register() {
    const [username, setUsername]=useState('')
    const [email, setEmail]=useState('')
    const [pass, setPass]=useState('')
    const [checked, setChecked]=useState(true)
    const [success, setSuccess]=useState([undefined,undefined])
    const [done, setDone]=useState(false)
    const Register=()=>{
        axios.post('http://localhost:7800/Register', {username, email, pass})
             .then((response)=>{
                 setDone(true)
             }).catch((err)=>{console.log(err.response.data.message)})
    }
    return (done?<Login />:
        (<>
        <div className="Register">
                <div align="center">
                    <img src={Slack} width="100"/>
                    <h1 className="Tell_me">Tell me</h1>
                </div>
                <div align="center">
                {/*success[0]?<div class="alert alert-success" role="alert">
  {success[1]}
</div>:success[0]===false?<div class="alert alert-danger" role="alert">
  {success[1]}
    </div>:''*/}
    <div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">Username</span>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(e)=>{setUsername(e.target.value)}}/>
  </div>
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
                        <input type="checkbox" />
                        <label>I agree for Terms of use!</label>
                    </div>
                    </div>
                    <div align="center">
                        <input type="submit" value="Register" onClick={Register}/>
                    </div>
            </div>
        </>
    ))
}