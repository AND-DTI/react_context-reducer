import  { PageDraw_SingleReducerContext, PageDraw_MultiReducerContext }  from './PageDraw'
import { AppContextProvider as SingleProvider } from './Context_Example_SingleReducer'
import { AppContextProvider as MultiProvider } from './Context_Example_MultiReducer'




const PageExample_Context = () => {
        
         
    return (
        <div>

          <SingleProvider>
            <PageDraw_SingleReducerContext />
          </SingleProvider>
          <br />
          <MultiProvider>
            <PageDraw_MultiReducerContext />
          </MultiProvider>          

        </div>
    )

}


export default PageExample_Context