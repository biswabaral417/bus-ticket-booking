import React from 'react';
import AddedWeekDaysBtn from './customComps/AddedWeekDaysBtn';
import ToAddWeekDaysBtn from './customComps/ToAddWeekDaysBtn';

export default function WeekDays({ weekDays, addedWeekDays, setAddedWeekDays, setAddRouteInps }) {
  return (
    <div>
      <div className="added">
        {addedWeekDays.map((day, index) => (
          <AddedWeekDaysBtn key={index} day={day} setAddedWeekDays={setAddedWeekDays} setAddRouteInps={setAddRouteInps} />
        ))}

      </div>
      <hr  style={{width:"650px"}}/>
      <div className="toAdd">
        {weekDays.filter((day) => !addedWeekDays.includes(day)).map((day, index) => (
          <ToAddWeekDaysBtn key={index} day={day} setAddedWeekDays={setAddedWeekDays} setAddRouteInps={setAddRouteInps}/>
        ))}
      </div>
    </div>
  );
}
