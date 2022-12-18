import React, { useContext, useState, useRef } from 'react'
import styled from 'styled-components'
import 'components/styles.css'
import './styles.css'
import { AppContext as AppContext_Single} from './Context_Example_SingleReducer'
import { AppContext as AppContext_Multi} from './Context_Example_MultiReducer'
import TextField from '@mui/material/TextField';
import { border } from '@mui/system'


//#region Styed
const Card_CST = styled.div`
  margin-top: 25px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  /*width: 70%;  */
  margin: 25px;  
  /*display: inline-box;*/
`

const CardGray_CST = styled.div`
  margin-top: 25px;
  background: lightgray;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);  
  /*width: 70%;  */
  margin: 25px;  
  /*display: inline-box;*/
`

const PositiveValue_CST = styled.label`
  font-weight: bold; /*normal, bold, 900*/
  font-size: 1.1rem;
  color: blue;
`
const NegativeValue_CST = styled.label`
  font-weight: bold;
  font-size: 1.1rem;
  color: red;
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
const ButtonAdd = styled.button`
  width: 100px;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.5rem;
  background-color: lightsteelblue;/*#9eb3c2;*/
  cursor: pointer;
  border: none;
  margin: 1rem;  
}
`
//#endregion


const PageDraw_SingleReducerContext = () => {
  
  const { state, dispatch } = useContext(AppContext_Single)
  function increment ()      {  dispatch ( {type:"increment"} )        }
  function decrement ()      {  dispatch ( {type:"decrement"} )        }  
  function somar (n: number) {  dispatch ( {type:"sum", payload: n} )  }

  let counterValue = <PositiveValue_CST>{state.counter}</PositiveValue_CST>
  let minValue = <PositiveValue_CST>{state.min}</PositiveValue_CST>
  let maxValue = <PositiveValue_CST>{state.max}</PositiveValue_CST>
  if( state.counter < 0) {counterValue = <NegativeValue_CST>{state.counter}</NegativeValue_CST>}  
  if( state.min < 0) {minValue = <NegativeValue_CST>{state.min}</NegativeValue_CST>}  
  if( state.min < 0) {maxValue = <NegativeValue_CST>{state.max}</NegativeValue_CST>}

  //Input Sample:    
  let [field1Value, setField1Value] = useState(1)

  return ( 
    <Card_CST>  
      <h2> Example Single-Reducer Context </h2> 

      <div style={{fontSize: "0.85em"}}>
          <label>counter: </label>{counterValue}<br/>
          <label>min: </label>{minValue}<br/>
          <label>max: </label>{maxValue}<br/>
      </div>
      
      <button onClick={() => dispatch({type:"increment"})}> + </button>
      <button onClick={decrement}> - </button><br/>
        
      <ButtonAdd onClick={() => somar(field1Value) }> Add </ButtonAdd>                                 
      <TextField variant="outlined"  label="Indirect update" type="number"        
        onChange = { (ev) => {  setField1Value(Number(ev.target.value)) }} 
      />

    </Card_CST>  
  )

}




const PageDraw_MultiReducerContext = () => {
   
  const { state, dispatch } = useContext(AppContext_Multi)  
  function setField1 (text: string) {  dispatch ( {type: "setField1", payload: text} )  }
  
  //Input sate:
  let [sumValue, setSumValue] = useState(0)
  //let [userNameValue, setUserNameValue] = useState("Zelda")
  //let [idValue, setIdValue] = useState(1)
  let [field1Value, setField1Value] = useState("-")

  
  return ( 
    <CardGray_CST>
      <h2> Example Multi-Reducer Context </h2> 
   

      <h4 style={{ display:'flex', margin:"10px"}}> Object 1 - Counter:</h4>
      <div style={{fontSize: "0.85em"}}>
        <label>counter: </label>{state.object1.counter}<br/>
        <label>min: </label>{state.object1.min}<br/>
        <label>max: </label>{state.object1.max}<br/>
      </div>
      <button onClick={() => dispatch({type:"increment"})}> + </button>
      <button onClick={() => dispatch({type:"decrement"})}> - </button>      
      <ButtonAdd onClick={() => dispatch({type:"sum", payload:sumValue}) }> Add </ButtonAdd>
      <TextField variant="outlined"  label="Sum(indirect update)" 
        onChange = { (ev) => {  setSumValue(Number(ev.target.value)) }} 
      />


      <br/><br/>
      <h4 style={{ display:'flex', margin:"10px"}}> Object 2 - User:</h4>
      <div style={{fontSize: "0.85em"}}>
        <label>ID: </label><strong>{state.object2.id}</strong><br/>
        <label>User Name: </label><strong>{state.object2.username}</strong><br/>
        <label>Field 1: </label><strong>{state.object2.field1}</strong><br/><br/>
      </div>
      <TextField variant="filled"  label="UserName (*direct update)" value={state.object2.username} 
        onChange = { (ev) => {  dispatch({type: "setUsername", payload: ev.target.value}) }} 
      />  {'\u00A0'}    
      <TextField variant="outlined"  label="Field-1 (*indirect update)" 
        onChange = { (ev) => {  setField1Value(ev.target.value) }} 
      />
      <br/>
      <ButtonForm onClick={() => setField1(field1Value) }> Update Field 1 </ButtonForm>
      <ButtonForm onClick={() => setField1("-Fixo-") }> Update field 1 "-Fixo-" </ButtonForm>

    </CardGray_CST>
   
  )

}




export { PageDraw_SingleReducerContext, PageDraw_MultiReducerContext }







