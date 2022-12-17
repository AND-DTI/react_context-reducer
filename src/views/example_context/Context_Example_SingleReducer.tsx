//import { createContext } from "vm"; com vm aceita createContext() vazio!
import { createContext, ReactNode, useState, useReducer } from "react";
import combineReducers from 'react-combine-reducers';
type IProps = { children: ReactNode }



//////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// CONTEXT WITH REDUCER ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

interface Object1Type {
    counter: number,
    min: number,
    max: number
}


type Action = 
        | {type: 'increment'} 
        | {type: 'decrement'}
        | {type: 'sum', payload:number}

function counterReducer (state:Object1Type, action:Action) {   //...(state:any, action:Action) {    
    
    let newMax = state.counter > state.max ? state.counter : state.max;
    let newMin = state.counter < state.min ? state.counter : state.min;
    
    let newMaxSum = state.max;
    let newMinSum = state.min;
    if(action.type=="sum"){
        newMaxSum = (state.counter+action.payload) > state.max ? state.counter+action.payload : state.max;
        newMinSum = (state.counter+action.payload) < state.min ? state.counter+action.payload : state.min;
    }
    
    switch(action.type){
        case "increment":                         
            return {
                ...state,                            
                counter : state.counter++,
                max     : newMax,
            }
        case "decrement":                         
            return {
                ...state,                                
                counter : state.counter--, 
                min     : newMin,
            }
        case "sum": return {
            ...state,
            counter: state.counter + action.payload,             
            max    : newMaxSum,
            min    : newMinSum,
        }        
        default: return state
    }    
    
}



/////////////////////////////////////////////////////////////////////////////////
// Single object Context / Provider /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
const INITIAL_STATE:Object1Type = {    
    counter: -1,
    min: -1,
    max: -1
}

interface AppContextType {  
    state: Object1Type,
    dispatch: React.Dispatch<any>
}

const AppContextStateInitial = {
    state: INITIAL_STATE,
    dispatch: () => null
}

export const AppContext = createContext<AppContextType>( {
    state: INITIAL_STATE,
    dispatch: () => null
})


export const AppContextProvider = ({ children }: IProps) => {

    const [state, dispatch] = useReducer(counterReducer, INITIAL_STATE)    
        
    return (
        <AppContext.Provider value={ {state, dispatch} } >
            {children}            
        </AppContext.Provider>
    )

}


