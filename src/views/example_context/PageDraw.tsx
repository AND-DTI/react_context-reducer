import React, { useContext, useState, useRef } from 'react'
import styled from 'styled-components'
import 'components/styles.css'
import './styles.css'
import { AppContext as AppContext_Single} from './Context_Example_SingleReducer'
import TextField from '@mui/material/TextField';



const Card_CST = styled.div`
  margin-top: 25px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  /*width: 70%;  */
  margin: 25px;  
  /*display: inline-box;*/
`
const ButtonForm = styled.button`
  width: 150px;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.5rem;
  background-color: lightsteelblue;/*#9eb3c2;*/
  cursor: pointer;
  border: none;
  margin: 1rem;  
}
`

const PageDraw_SingleReducerContext = () => {

  return ( 
    <h1> Example Single-Reducer Context </h1> 
  )

}




const PageDraw_MultiReducerContext = () => {
   
  return ( 
    <h1> Example Multi-Reducer Context </h1> 
  /*  
    const { state, dispatch } = useContext(AppContext2)

    function increment () {  dispatch ( {type: "increment"} )  }
    function decrement () {  dispatch ( {type: "decrement"} )  }
    function setField1 (text: string) {  dispatch ( {type: "setField1", payload: text} )  }    

    //Input Sample:    
    let [field1Value, setField1Value] = useState("")
    console.log(state)
    return (  
      <div>
        <h1>Drawing Page...</h1>
        <div style={{fontSize: "0.65em"}}>
          <label>counter: {state.object1.counter} </label><br/>
          <label>field1: {state.object1.field1} </label><br/>
          <label>id: {state.object2.id} </label><br/>
          <label>id: {state.object2.username} </label><br/>
          </div>
      </div> 

*/

/*
        <div>
          <h1>Drawing Page...</h1>
                                     
          <Card_CST>            
            <h4> 
              |React Context-Reeducer-Example: <strong style={ {color:"red"} }>{ state.field1}</strong>
            </h4>
            <p>
              The counter is <span> {state.counter} </span>
            </p>
            <p>
              <button onClick={() => dispatch({type:"increment"})}> + </button>
              <button onClick={decrement}> - </button>
            </p>
            <ButtonForm onClick={() => setField1(field1Value) }> Update Text </ButtonForm>
            <ButtonForm onClick={() => setField1("-Fixo-") }> Set "-Fixo-" </ButtonForm>
            <p></p>   
            <TextField variant="outlined"  label="Direct update"  value={state.field1}
                onChange = { (ev) => {  setField1(ev.target.value)  }}  
            />                                  
            <TextField variant="filled"  label="Indirect update" 
              onChange = { (ev) => {  setField1Value(ev.target.value) }} 
            />
            
          </Card_CST>
        </div>
        */
    )

}


export { PageDraw_SingleReducerContext, PageDraw_MultiReducerContext }

/*
 <TextField variant="outlined"  label="Direct update"  value={state.field1}
                onChange = { (ev) => {  setField1(ev.target.value)  }}  
              />      


 <input type="text" ref={field1Ref} />
 <TextField id="outlined-basic" label="Outlined" variant="outlined"   value={field1Value}/>
<TextField id="filled-basic" label="Filled" variant="filled" />
 <TextField id="standard-basic" label="Standard" variant="standard" />


*/ 


