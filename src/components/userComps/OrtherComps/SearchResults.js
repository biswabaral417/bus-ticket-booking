import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function SearchResults() {
  const { finalDate, ToLocation, fromLocation } = useLocation().state;
  const [Buses, setBuses] = useState([])
  useEffect(() => {
    const searchResFetcher = async () => {
      const res = await fetch("/api/searchbuses", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fromLocation,ToLocation, finalDate }),
      }
      )
      const data = await res.json()
      console.log(data)
      setBuses(data);
    }
      searchResFetcher()
    
  },[ToLocation,fromLocation,finalDate])

  return (
    <>
      {Buses.map((bus) => (
          <div key={bus._id}>
            <p>{bus.agencyName}</p>
          </div>
        )
      )}
    </>
  )
}
