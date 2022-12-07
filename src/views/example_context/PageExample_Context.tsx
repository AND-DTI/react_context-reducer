import GanttDraw from './PageDraw'
import { AppContextProvider, AppContextProvider2 } from './Context_Example'




const PageExample_Context = () => {
        
         
    return (
        <div>
          <AppContextProvider2>          
            <GanttDraw />                           
          </AppContextProvider2>          
        </div>
    )

}


export default PageExample_Context