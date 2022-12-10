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
    switch(action.type){
        case "increment": 
        return {
            ...state,
            counter:  state.counter++,  
        }
        case "decrement": return {
            ...state,
            counter:  state.counter--, 
        }
        case "sum": return {
            ...state,
            counter:  state.counter + action.payload, 
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


