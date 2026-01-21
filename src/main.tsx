import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <>
        <App />
    </>
    /*
        Fragments :
            -> it used to group multiple html element 
            -> Fragment have not tag name just <></> 
            -> There is Another method to create Fragment which is <Fragment></Fragment>
            -> Fragment allow us to put multiple element inside that 
                because we can not return multiple element for render,we must have one parent whihc render.
            -> That Parent Can have one or more child elements
            -> it also make code clean, and prevent Unnecessary use of div
    */
)
