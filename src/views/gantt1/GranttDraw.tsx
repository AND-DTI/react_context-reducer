import React, { useContext, useState, useRef } from 'react'
//import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react'
import { ViewSwitcher } from "components/graph/view-switcher"
import "gantt-task-react/dist/index.css"
import styled from 'styled-components'
import './styles.css'
import 'components/styles.css'
import { GraphContext, GraphContext2, GraphContext3, AppContext } from './GraphContext'
import TextField from '@mui/material/TextField';

const GanttContainer = styled.div`
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

const GanttDraw = () => {
   
   //get context:
   //const {field1, setField1} = useContext(GraphContext)
   //const [state, dispatch] = useContext(GraphContext2)
   const graphContext = useContext(GraphContext2)


    //const [view, setView] = React.useState<ViewMode>(ViewMode.Day)
    //const [tasks, setTasks] = React.useState<Task[]>(gData.initTasks())
    //const [isChecked, setIsChecked] = React.useState(false)
    


   
/*
    let columnWidth = 65;
    //let headerHeigth = 50;
    if (view === ViewMode.Year) {
      columnWidth = 350;
    } else if (view === ViewMode.Month) {
      columnWidth = 300;
    } else if (view === ViewMode.Week) {
      columnWidth = 70; //250
    }else if (view === ViewMode.Day) {
      columnWidth = 60; 
      //headerHeigth = 100;
    }
*/
   /*
    const handleExpanderClick = (task: Task) => {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));     
      
      console.log("view mode: "+view)
      console.log("contexto ==> "+field1)

    };  
      
    const handleProgressChange = async (task: Task) => {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
      console.log("On progress change Id:" + task.id);
    };    
*/
    /*const handleTaskChange = (task: Task) => {
      console.log("On date change Id:" + task.id);
      let newTasks = tasks.map(t => (t.id === task.id ? task : t));
      if (task.project) {
        const [start, end] = getStartEndDateForProject(newTasks, task.project);
        const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
        if (
          project.start.getTime() !== start.getTime() ||
          project.end.getTime() !== end.getTime()
        ) {
          const changedProject = { ...project, start, end };
          newTasks = newTasks.map(t =>
            t.id === task.project ? changedProject : t
          );
        }
      }
      setTasks(newTasks);
    };*/
  
   
   



    /*function increment() {
      graphContext.action
      
      dispatch( {type: "increment"} )
    }
    function decrement() {}
   */



    const { state, dispatch } = useContext(AppContext)
    function increment () {  dispatch ( {type: "increment"} )  }
    function decrement () {  dispatch ( {type: "decrement"} )  }
    function setField1 (text: string) {  dispatch ( {type: "setField1", payload: text} )  }    


    //Input Sample:
    //const field1Ref = useRef(null)
    let [field1Value, setField1Value] = useState("value 2")//state.field1

    return (

        <div>
          <h1>Drawing graph...</h1>
                                     
          <GanttContainer>
            <strong> |chart context: { state.field1}| </strong>                        
            <p>
              The counter is <span> {state.counter} </span>
            </p>
            <button onClick={() => dispatch({type:"increment"})}> + </button>
            <button onClick={decrement}> - </button>
            <ButtonForm onClick={() => setField1(field1Value) }> Update Text </ButtonForm>
            <ButtonForm onClick={() => setField1("-Fixo-") }> Set "-Fixo-" </ButtonForm>
            <p>
              <input type="text" value={state.field1}           
                onChange = { (ev) => {  setField1(ev.target.value)  }}  
              />                       
            </p>
            <TextField id="filled-basic" label="Filled" variant="filled" 
              onChange = { (ev) => {  setField1Value(ev.target.value) }} 
            />
            
          </GanttContainer>
        </div>
    )

}


export default GanttDraw

/*
 <input type="text" name='inputField1'    ref={field1Ref} />
 <TextField id="outlined-basic" label="Outlined" variant="outlined"   value={field1Value}/>
<TextField id="filled-basic" label="Filled" variant="filled" />
 <TextField id="standard-basic" label="Standard" variant="standard" />


*/ 

/*
         <ViewSwitcher
            onViewModeChange={viewMode => setView(viewMode)}
            onViewListChange={setIsChecked}
            isChecked={isChecked}
          />  
          <GraphContextProvider>
          <GanttContainer>
            <Gantt 
                tasks={tasks} 
                viewMode={view}   
                //viewDate={new Date('2022-01-01')}
                //viewDate?: Date;
                //preStepsCount?: number;                        
                //***************************locale={"brazil"}
                locale={"pt-BR"}
                //rtl={true}
                //onDateChange={handleTaskChange}
                //onDelete={handleTaskDelete}
                onProgressChange={handleProgressChange}
                onDoubleClick={gData.handle2Click}
                onClick={gData.handleClick}
                //onSelect={gData.handleSelect}
                onExpanderClick={handleExpanderClick}
                listCellWidth={isChecked ? "155px" : ""}
                ganttHeight={400}            
                columnWidth={columnWidth}

                //headerHeight={150}
                rowHeight={35}
                //arrowIndent={35}
                

                //todayColor={"orange"}
            />
          </GanttContainer>
          </GraphContextProvider>
          

*/
