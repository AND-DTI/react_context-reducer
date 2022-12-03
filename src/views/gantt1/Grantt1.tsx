import React, { useContext } from 'react'
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react'
import { ViewSwitcher } from "components/graph/view-switcher"
import "gantt-task-react/dist/index.css"
import styled from 'styled-components'
import './styles.css'
import 'components/styles.css'
//import { getStartEndDateForProject, initTasks, handle2Click } from "./ganttData"
import * as gData from "./ganttData"
import GanttDraw from './GranttDraw'
import { GraphContext, GraphContextProvider2 } from './GraphContext'




const Gantt1 = () => {
    
    const [view, setView] = React.useState<ViewMode>(ViewMode.Day)
    const [tasks, setTasks] = React.useState<Task[]>(gData.initTasks())
    const [isChecked, setIsChecked] = React.useState(false)
    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }


    //teste context:
    const {field1, setField1} = useContext(GraphContext)

   
   
  
   

    return (

        <div>
          <GraphContextProvider2>          
            <GanttDraw />                           
          </GraphContextProvider2>
          
        </div>
    )

}


export default Gantt1


//<h1> Gantt 1 </h1>