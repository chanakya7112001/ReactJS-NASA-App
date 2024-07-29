import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import SideBar from "./components/SideBar.jsx";
import {useEffect, useState} from "react";

function App() {

    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState(null)

    function handleToggleModal() {
        setShowModal(!showModal)
    }

    useEffect(() => {
        async function fetchAPIData(){
            const NASA_KEY = import.meta.env.NASA_API_KEY
            const url = 'https://api.nasa.gov/planetary/apod' +
                `?api_key=${NASA_KEY}`
            const today = (new Date()).toDateString()
            const localkey = `NASA-${today}`
            if(localStorage.getItem(localkey)){
                const apiData = JSON.parse(localStorage.getItem(localkey))
                setData(apiData)
            }
            localStorage.clear()

            try{
                const res = await fetch(url)
                const apiData = await res.json()
                localStorage.setItem(localkey, JSON.stringify(apiData))
                setData(apiData)
                console.log(apiData)
            } catch (e) {
                console.log(e.message);
            }
        }
        fetchAPIData()
    }, []);
    return (
    <>
        {data ? (<Main data={data}/>) : (
            <div className="loadingState">
                <i className="fa-solid da-gear"></i>
            </div>
            )}
      {showModal && (<SideBar data={data} handleToggleModal={handleToggleModal}/>)}
        {data && (<Footer data={data} handleToggleModal={handleToggleModal}/>)}
    </>
  )
}

export default App
