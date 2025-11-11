import React, { useState } from 'react'
import app from "../firebaseConfig";
import { getDatabase, ref, get, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function UpdateRead() {
  const navigate = useNavigate()

  let [fruitArray, setFruitArray] = useState([])

  const fetchData = async () => {
    const db = getDatabase(app)
    const dbRef = ref(db, "nature/fruits")
    const snapshot = await get(dbRef)
    if (snapshot.exists()) {
      const myData = snapshot.val()
      const tempArray = Object.keys(myData).map(myFireId => {
        return {
          ...myData[myFireId],
          fruitId: myFireId
        }
      })

      setFruitArray(tempArray)
    } else {
      alert("error")
    }
  }

  const deleteFruit = async (fruitIdParam) => {
    const db = getDatabase(app)
    const dbRef = ref(db, "nature/fruits/"+fruitIdParam)
    await remove(dbRef)
    window.location.reload()
  }

  return (
    <div>
      <h1>UPDATE READ</h1>
      <button onClick={fetchData}>Display Data</button>
      <ul>
        {fruitArray.map((item, index) => (
          <li key={index}>
            {item.fruitName}: {item.fruitDefinition} : {item.fruitId}
            <button onClick={() => navigate(`/updatewrite/${item.fruitId}`)}>UPDATE</button>
            <button onClick={() => deleteFruit(item.fruitId)}>DELETE</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>GO HOMEPAGE</button>
      <button onClick={() => navigate("/read")}>GO READ PAGE</button>
    </div>
  )
}
