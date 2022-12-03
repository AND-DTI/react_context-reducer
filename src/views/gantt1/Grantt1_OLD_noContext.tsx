import React, { useContext } from 'react'
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react'
import { ViewSwitcher } from "components/graph/view-switcher"
import "gantt-task-react/dist/index.css"
import styled from 'styled-components'
import './styles.css'
import 'components/styles.css'
//import { getStartEndDateForProject, initTasks, handle2Click } from "./ganttData"
import * as gData from "./ganttData"
import { GraphContext, GraphContextProvider } from './GraphContext'



const GanttContainer = styled.div`
  margin-top: 25px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  /*width: 70%;  */
  margin: 25px;  
  /*display: inline-box;*/
`


const Gantt1 = () => {
    
    const [view, setView] = React.useState<ViewMode>(ViewMode.Day)
    const [tasks, setTasks] = React.useState<Task[]>(gData.initTasks())
    const [isChecked, setIsChecked] = React.useState(false)
    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }


    //teste context:
    const {field1, setField1} = useContext(GraphContext)

    let columnWidth = 65;
    //let headerHeigth = 50;
    if (view === ViewMode.Year) {
      columnWidth = 350;
    } else if (view === ViewMode.Month) {
      columnWidth = 300;
    } else if (view === ViewMode.Week) {
      columnWidth = 70; /*250*/
    }else if (view === ViewMode.Day) {
      columnWidth = 60; 
      //headerHeigth = 100;
    }

   
    const handleExpanderClick = (task: Task) => {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));     
      
      console.log("view mode: "+view)
      console.log("contexto ==> "+field1)

    };  
      
    const handleProgressChange = async (task: Task) => {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
      console.log("On progress change Id:" + task.id);
    };    

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
  
   
   
   
   


    return (

        <div>
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
          
        </div>
    )

}


export default Gantt1


//<h1> Gantt 1 </h1>