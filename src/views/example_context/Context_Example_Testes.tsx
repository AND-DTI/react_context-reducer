//import { createContext } from "vm"; com vm aceita createContext() vazio!
import { createContext, ReactNode, useState, useReducer } from "react";
import { useTheme } from "styled-components";


type GraphContextProps = {
    children: ReactNode
}

type GraphContextType = {
    field1: String,   
    setField1: (value: string) => void        
    //setField1: (newState: React.Dispatch<React.SetStateAction<string>>) => void
}


/*export declare */
enum ViewMode {
    Hour = "Hour",
    QuarterDay = "Quarter Day",
    HalfDay = "Half Day",
    Day = "Day",
    /** ISO-8601 week */
    Week = "Week",
    Month = "Month",
    Year = "Year"
}




const initialValue = {
    field1: "default text!", setField1: (value: string) => {}, //setField1: () => {},
    view: ViewMode.Month, setView: (value: ViewMode) => {},
}




export const GraphContext = createContext(initialValue)


export const GraphContextProvider = ({ children }: GraphContextProps) => {

    const [field1, setField1] = useState(initialValue.field1)
    const [view, setView] = useState(initialValue.view)
    
    return (
        <GraphContext.Provider value={ {field1, setField1, view, setView} } >
            {children}            
        </GraphContext.Provider>
    )    

}













//////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// REDUCER ////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//type GraphState = typeof initialValue
interface GraphType {
    field1: string,   
    view: ViewMode,
    counter: number,
}

interface GraphStateType {
    //field1: String,   
    //view: ViewMode,
    graphObject: GraphType,
    action: React.Dispatch<string>
}

const initialState1 = {
    graphObject: {
        field1: "default text with Reducer!",
        view: ViewMode.Month,
        counter: 0
    },       
    action: (value: string) => value
}
/*
const reducer1 = (state:GraphStateType, action:string) => {
    switch(action){
        case "increment":
            return (

                state = state
            )
        case "decrement": 
            return state
        default:
            return state
    }
}
*/






const graphObjectInitial = {
    field1: "default text with Reducer!",
    view: ViewMode.Month,
    counter: -1
}













type Action = 
        | {type: 'increment'} 
        | {type: 'decrement'}
        | {type: 'setField1', payload:string}
        //| {type: 'setField1', NewField1:string}

function graphReducer (state:GraphType, action:Action) {
    //function reducer (state:any, action:Action) {
    switch(action.type){
        case "increment":
            return {
                ...state,
                counter:  state.counter++,                       
            }
        case "decrement": 
        return {
            ...state,
            counter:  state.counter--,                       
        }
        case "setField1": 
        return {
            ...state,
            field1:  action.payload, //OLD action.NewField1
        }        
        default:
            return state
    }
    return state

}

/*
field1:   "text reducer update",
                view:     ViewMode.Day,         
*/



export const GraphContext2 = createContext<GraphStateType>(initialState1)
export const AppContext = createContext<{
    state: GraphType;
    dispatch: React.Dispatch<any>;
    //action: React.Dispatch<string>
  }>({
    state: graphObjectInitial,
    dispatch: () => null
    //dispatch: (value: any) => null
  });
  export const GraphContext3 = createContext({})


export const GraphContextProvider2 = ({ children }: GraphContextProps) => {

        
    const [state, dispatch] = useReducer(graphReducer, graphObjectInitial)    


    return (
        <AppContext.Provider value={ {state, dispatch} } >
            {children}            
        </AppContext.Provider>
    )
    
    
         
    /*return (
        <GraphContext2.Provider value={ {state, dispatch} } >
            {children}            
        </GraphContext2.Provider>
    )*/
    



    //const [graphObject, dispatch] = useReducer(reducer1, initialState1)    


}



