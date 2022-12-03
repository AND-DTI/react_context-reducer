import React, { useState, useContext } from 'react'
import { Task } from "components/types/graph/public-types"
import { GraphContext } from './GraphContext'

export function initTasks() {
  const currentDate = new Date();
  const tasks: Task[] = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 60),
      name: "Some Project",
      id: "ProjectSample",
      progress: 25,
      type: "project",
      hideChildren: false,
      displayOrder: 1,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(),currentDate.getMonth(),10, 12, 28 ),
      name: "Idea",
      id: "Task 0",
      progress: 45,
      type: "task",
      project: "ProjectSample",
      displayOrder: 2,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20, 0, 0),
      name: "Research",
      id: "Task 1",
      progress: 25,
      dependencies: ["Task 0"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 3,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 15, 0, 0),
      name: "Discussion with team",
      id: "Task 2",
      progress: 10,
      dependencies: ["Task 1"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 4,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 16),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 20, 0, 0),
      name: "Developing",
      id: "Task 3",
      progress: 2,
      dependencies: ["Task 2"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 5,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 20),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 29),
      name: "Review",
      id: "Task 4",
      type: "task",
      progress: 70,
      dependencies: ["Task 2"],
      project: "ProjectSample",
      displayOrder: 6,
      //styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
      styles: { progressColor: 'green', progressSelectedColor: '#ff9e0d' },
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 30),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 30),
      name: "Release",
      id: "Task 6",
      progress: currentDate.getMonth(),
      type: "milestone",
      dependencies: ["Task 4"],
      project: "ProjectSample",
      displayOrder: 7,
    },
    /*{
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: "Party Time",
      id: "Task 9",
      progress: 0,
      isDisabled: true,
      type: "task",
    },*/

    /*readme example
    let tasks: Task[] = [
        {
          start: new Date(2020, 1, 1),
          end: new Date(2020, 1, 2),
          name: 'Idea',
          id: 'Task 0',
          type:'task',
          progress: 45,
          isDisabled: true,
          styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        },        
    ]*/


  ];
  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}













export const handleClick = (task: Task) => {
  console.log("On Click event Id ==> " + task.id) 
  HandleTask()
}

export const handle2Click = (task: Task) => {
  alert("On Double Click event Id:" + task.id);
  console.log("boble clique ===> "+ task.id)
}

/*const handleProgressChange = async (task: Task) => {
  setTasks(tasks.map(t => (t.id === task.id ? task : t)));
  console.log("On progress change Id:" + task.id);
};*/

export const handleSelect = (task: Task, isSelected: boolean) => {
  console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
}       

/*const handleTaskDelete = (task: Task) => {
  const conf = window.confirm("Are you sure about " + task.name + " ?");
  if (conf) {
    setTasks(tasks.filter(t => t.id !== task.id));
  }
  return conf;
};*/    

























  /////////////////////////////////////////////////////////////////////////////////////
  // TESTES ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////    
  //const tasks: Task[] = [
  const defaultTasks: Task[] = []
  //const [tasks, setTasks] = React.useState<Task[]>(defaultTasks)    
  
  export const handleExpanderClick2 = (task: Task) => {
    //const [tasks, setTasks] = React.useState<Task[]>(defaultTasks)    
    //const [hide, setHide] = React.useState<Boolean>(true)    
    //setTasks(tasks.map(t => (t.id === task.id ? task : t)));
  
    console.log("On expander click:" + task.id +"/"+task.hideChildren)    
    task.hideChildren=!task.hideChildren
    console.log("new value: " + task.hideChildren)
    
  }
  /*const HandleExpanderClick = (task: Task) => {
    const [tasks, setTasks] = React.useState<Task[]>(defaultTasks)    
    
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };*/



export function HandleTask() {
  
   //teste context:
   const {field1} = useContext(GraphContext)

  //console.log(useState())

  var texto = "handle tasks with context!!! [from context => "+field1+"]" 
  console.log("text: "+texto)
  return texto

}