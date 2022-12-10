//import { createContext } from "vm"; com vm aceita createContext() vazio!
import { createContext, ReactNode, useState, useReducer } from "react";
import combineReducers from 'react-combine-reducers';
type IProps = { children: ReactNode }





//////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// CONTEXT WITH REDUCER ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

const Object1_INITIAL:Object1Type = {    
    counter: -1,
    min: -1,
    max: -1
}

interface Object1Type {
    counter: number,
    min: number,
    max: number
}

const Object2_INITIAL = {
    id: 0,
    username: "---",
    field1: "default text with Reducer!",
}

type Object2Type = typeof Object2_INITIAL




  

// Reducer Object 1:
type Action1 = 
        | {type: 'increment'} 
        | {type: 'decrement'}
        | {type: 'sum', payload:number}

function counterReducer (state:Object1Type, action:Action1) {   //...(state:any, action:Action) {    
    switch(action.type){
        case "increment": return {
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

// Reducer Object 2:
type Action2 = | {type: 'setId', payload:number}
               | {type: 'setUsername', payload:string}
               | {type: 'setField1', payload:string}

function fieldsReducer (state:any, action:Action2) { 
    switch(action.type){        
        case "setId": return {
            ...state,
            id:  action.payload, 
        }        
        case "setUsername": return {
            ...state,
            field1:  action.payload, 
        }                    
        case "setField1": return {
            ...state,
            field1:  action.payload, 
        }        
        default: return state
    }    
}




/////////////////////////////////////////////////////////////////////////////
// Combine reducers /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
type ProfileState = { 
    object1: Object1Type,
    object2: Object2Type
  };
type MainAction = { type: string; payload: any; };
type ProfileReducer = (state: ProfileState, action: MainAction) => ProfileState;

const [profileReducer, initialProfile] = combineReducers<ProfileReducer>({
    object1: [counterReducer, Object1_INITIAL],
    object2: [fieldsReducer, Object2_INITIAL]
  });






/////////////////////////////////////////////////////////////////////////////////
// Single object Context / Provider /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
interface AppContextType {  
    state: Object1Type,
    dispatch: React.Dispatch<any>
}
const AppContextStateInitial = {
    state: Object1_INITIAL,
    dispatch: () => null
}
export const AppContext = createContext<AppContextType>(AppContextStateInitial)


export const AppContextProvider = ({ children }: IProps) => {

    const [state, dispatch] = useReducer(counterReducer, Object1_INITIAL)    
        
    return (
        <AppContext.Provider value={ {state, dispatch} } >
            {children}            
        </AppContext.Provider>
    )

}
/////////////////////////////////////////////////////////////////////////////End



interface AppContextType2 {      
    state: ProfileState,
    dispatch: React.Dispatch<any>
}

const INITIAL_STATE = {
    object1: {        
        counter: -1,
        min: -1,
        max: -1,
    },
    object2: {
        id: 0,
        username: "---",
        field1: "default text with Reducer!",
    }
}

const AppContextStateInitial2 = {    
    state: INITIAL_STATE,
    dispatch: () => null
}

export const AppContext2 = createContext<AppContextType2>(AppContextStateInitial2)

export const AppContextProvider2 = ({ children }: IProps) => {
    
    const [state, dispatch] = useReducer<ProfileReducer>(
        profileReducer,
        initialProfile
    )

    return (
        <AppContext2.Provider value={ {state, dispatch} } >
            {children}            
        </AppContext2.Provider>
    )

}

