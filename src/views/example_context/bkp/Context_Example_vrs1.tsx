//import { createContext } from "vm"; com vm aceita createContext() vazio!
import { createContext, ReactNode, useState, useReducer } from "react";
import combineReducers from 'react-combine-reducers';
type ExampleContextProps = { children: ReactNode }





//////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// CONTEXT WITH REDUCER ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//type ExampleObjectType = typeof graphObjectInitial
interface ExampleObjectType {
    counter: number,
    field1: string
}

interface ExampleObject2Type {    
    id: number,
    username: string
}

const ExampleObjectInitial = {
    field1: "default text with Reducer!",
    counter: -1
}

const ExampleObject2Initial: ExampleObject2Type = {
    id: 0,
    username: "---"
}

interface AppContextType {  
    state: ExampleObjectType,
    dispatch: React.Dispatch<any>
}

const AppContextStateInitial = {
    state: ExampleObjectInitial,
    dispatch: () => null
}

export const AppContext = createContext<AppContextType>(AppContextStateInitial)


  


type Action = 
        | {type: 'increment'} 
        | {type: 'decrement'}
        | {type: 'setField1', payload:string}

function counterReducer (state:ExampleObjectType, action:Action) {   //...(state:any, action:Action) {    
    switch(action.type){
        case "increment": return {
            ...state,
            counter:  state.counter++,  
        }
        case "decrement": return {
            ...state,
            counter:  state.counter--, 
        }
        case "setField1": return {
            ...state,
            field1:  action.payload, 
        }        
        default: return state
    }    
}

type ActionFields = | {type: 'setField1', payload:string}
                    | {type: 'setField2', payload:string}

function fieldsReducer (state:any, action:ActionFields) { 
    switch(action.type){        
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
    object1: ExampleObjectType,
    object2: ExampleObject2Type
  };
type MainAction = { type: string; payload: any; };
type ProfileReducer = (state: ProfileState, action: MainAction) => ProfileState;

const [profileReducer, initialProfile] = combineReducers<ProfileReducer>({
    object1: [counterReducer, ExampleObjectInitial],
    object2: [fieldsReducer, ExampleObject2Initial]
  });

/*
const mainReducer = ({ products, shoppingCart }, action:any) => ({
    products: counterReducer(products, action),
    shoppingCart: counterReducer(shoppingCart, action),
});
*/






export const AppContextProvider = ({ children }: ExampleContextProps) => {

    const [state, dispatch] = useReducer(counterReducer, ExampleObjectInitial)    
    //const [state2, dispatch2] = useReducer(mainReducer, ExampleObjectInitial)    
    
    return (
        <AppContext.Provider value={ {state, dispatch} } >
            {children}            
        </AppContext.Provider>
    )

}




interface AppContextType2 {  
    //state: {ExampleObjectType:any, ExampleObject2Type:any},
    state: ProfileState,
    dispatch: React.Dispatch<any>
}

const INITIAL_STATE = {

    object1: {
        field1: "default text with Reducer!",
        counter: -1
    },
    object2: {
        id: 0,
        username: "---"
    }
}

const AppContextStateInitial2 = {
    //state: {ExampleObjectInitial, ExampleObject2Initial},
    state: INITIAL_STATE,//{object1: {}, object2: {}},
    dispatch: () => null
}
//export const AppContext = createContext<AppContextType>(AppContextStateInitial)



/*
type ProfileState = { 
    object1: ExampleObjectType,
    object2: ExampleObject2Type
  };
*/

export const AppContext2 = createContext<AppContextType2>(AppContextStateInitial2)
//export const AppContext2 = createContext<ProfileState>(initialProfile)
export const AppContextProvider2 = ({ children }: ExampleContextProps) => {

    //const [state, dispatch] = useReducer(counterReducer, ExampleObjectInitial)        

    const [state, dispatch] = useReducer<ProfileReducer>(
        profileReducer,
        initialProfile
    );


    return (
        <AppContext2.Provider value={ {state, dispatch} } >
            {children}            
        </AppContext2.Provider>
    )

}

