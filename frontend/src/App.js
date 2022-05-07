import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import axios from 'axios';
function App(props) {
  const [name, setName]=useState(props.username)
  const [messageG, setMessageG]=useState('')
  const [messageGs, setMessageGs]=useState([{Name:"Admin ☑️", messageG:"Hi"}])
  const [value, setValue]=useState(0)
  const AddMessage=(e)=>{
    e.preventDefault()
    axios
      .put('http://localhost:7800/AddMessageToGroup', {name,messageG})
      .then((response)=>{
        console.log("Successful!")
      }).catch((err)=>{
        console.log(err)
    })
    setTimeout(()=>{
      window.location.reload()
    },800)
    ShowMessages()
  }
  const ShowMessages=()=>{
    axios.put('http://localhost:7800/printmessages', {defaultvalue:"23"})
      .then((response)=>{
        setMessageGs(response.data)
        console.log(response.data)
        console.log(messageGs)
        setValue(2)
      }).catch((err)=>{
        console.log(err)
        setValue(2)
    })
  }
  const func=()=>value===0?ShowMessages():0
  func()
  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
  </header>*/}
      <div className="All">
        <div className="ChatDiv">
          {messageGs.map((obj)=>{
              return (
                <>
                  <h3 className="Name">{obj.Name}</h3>
                  <h4 className="messageG">{obj.messageG}</h4>
                </>
              )
            })
          }
        </div>
        <form>
          {/*<input type="text" placeholder="Type your name here!" onChange={(e)=>{setName(e.target.value)}} />*/}
          <div class="input-group mb-3 message">
  <span class="input-group-text" id="basic-addon1">Message:</span>
  <input type="text" class="form-control" placeholder="Message" aria-label="Username" aria-describedby="basic-addon1"  onChange={(e)=>{setMessageG(e.target.value)}}/>
                </div>
          {/*<input type="text" placeholder="Type your message here as well" onChange={(e)=>{setMessageG(e.target.value)}} />*/}
          <input type="submit" className="send_message btn btn-primary" value="Send message!" onClick={(e)=>AddMessage(e)} />
        </form>
      </div>
    </div>
  );
}

export default App;
