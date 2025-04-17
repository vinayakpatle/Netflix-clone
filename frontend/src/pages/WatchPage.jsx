import React from 'react'
import { useParams } from 'react-router-dom'

const WatchPage = () => {
    const {id}=useParams() // it gives object that's why destructure it
    const [trailers,setTrailers]=useState([]);
    

  return (
    <div>
        WatchPage
    </div>
  )
}

export default WatchPage