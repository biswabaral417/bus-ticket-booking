import React from 'react'

export default function ToAddWeekDaysBtn({ day,setAddRouteInps, setAddedWeekDays}) {
    const addWeekDays=()=>{
            setAddedWeekDays((prev)=>[...prev,day])
            setAddRouteInps((prev) => ({
                ...prev,
                days: [...prev.days, day]
            }));
    
    }
    return (
        <div className='ToAddWeekDaysBtn'>
            <h3>
                {day}
            </h3>
            <button onClick={addWeekDays}>+</button>
        </div>
    )
}
