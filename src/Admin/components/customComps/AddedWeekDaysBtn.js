import React from 'react'

export default function AddedWeekDaysBtn({ day,setAddedWeekDays,setAddRouteInps }) {
    const removeWeekDays=()=>{
        setAddedWeekDays((prev)=>prev.filter((days)=>days!==day))
        setAddRouteInps((prev) => ({
            ...prev,
            days: prev.days.filter((days) => days !== day)
        }));
}
    return (
        <div className='AddedWeekDayaComp'>
            <h3>
                {day}
            </h3>
            <button onClick={removeWeekDays}>X</button>
        </div>
    )
}
