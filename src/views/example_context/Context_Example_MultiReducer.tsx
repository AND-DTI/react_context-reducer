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
type Action1 = | {type: 'increment'} 
               | {type: 'decrement'}
               | {type: 'sum', payload:number}

function counterReducer (state:Object1Type, action:Action1) {   //...(state:any, action:Action) {    
    
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
            username:  action.payload, 
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
// Multi object Context / Provider //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
interface AppContextType {      
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

const AppContextStateInitial = {    
    state: INITIAL_STATE,
    dispatch: () => null
}

export const AppContext = createContext<AppContextType>(AppContextStateInitial)

export const AppContextProvider = ({ children }: IProps) => {
    
    const [state, dispatch] = useReducer<ProfileReducer>(
        profileReducer,
        initialProfile
    )

    return (
        <AppContext.Provider value={ {state, dispatch} } >
            {children}            
        </AppContext.Provider>
    )

}

