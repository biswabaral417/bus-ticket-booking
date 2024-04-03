import React, { useState, useRef } from 'react'
import WeekDays from './WeekDays'
import LocationSelector from './customComps/LocationSelector'

export default function AddRoutes() {

    const [addRouteInps, setAddRouteInps] = useState({
        FromLocationInp: "",
        ToLocationInp: "",
        DepartureTime: "",
        Cost: 0,
        days: [],
    })
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    // value, setter, pos, setvis
    const ToLocationEl = useRef(null);
    const fromLocationEl = useRef(null);
    const [pos, setPos] = useState("");
    const [suggentionsFromVisiblity, setSuggentionsFromVisiblity] =
        useState(false);
    const [suggentionsToVisiblity, setSuggentionsToVisiblity] = useState(false);

    const HandleLocationChange = (e) => {
        if (e.target.id === "FromLocationInp") {
            setPos("FromLocationInp");
            setSuggentionsFromVisiblity(e.target.value !== "");
            setSuggentionsToVisiblity(false);
            setAddRouteInps((prev) => ({
                ...prev,
                FromLocationInp: e.target.value
            }))
        } else {
            setPos("toToLocationInp");
            setSuggentionsFromVisiblity(false);
            setSuggentionsToVisiblity(e.target.value !== "");
            setAddRouteInps((prev) => ({
                ...prev,
                ToLocationInp: e.target.value
            }))
        }

        //setVluses
    };

    const [addedWeekDays, setAddedWeekDays] = useState([])

    const addRoute = async () => {
        const res = await fetch('/api/addroutes',{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(addRouteInps),
        });
        const data=await res.json()
        if (res.status === 201) {
            window.alert(data.success)
        }
        else {
            window.alert(data.error)
        }    }





    return (
        <div className='AddRoutesComponent'>
            <div className='ps_rel'>
                <label htmlFor="FromLocationInp">From :</label>

                <input type="text" id='FromLocationInp'
                    value={addRouteInps.FromLocationInp}
                    ref={fromLocationEl}

                    onChange={
                        HandleLocationChange
                    } />
                {suggentionsFromVisiblity && (
                    <LocationSelector
                        value={addRouteInps.FromLocationInp}
                        setter={setAddRouteInps}
                        pos={pos}
                        setvis={setSuggentionsFromVisiblity}
                    />)}
            </div>
            <div className='ps_rel'>
                <label htmlFor="ToLocationInp">To :</label>
                <input type="text" id='ToLocationInp'
                    ref={ToLocationEl}
                    onChange={
                        HandleLocationChange}
                    value={addRouteInps.ToLocationInp}
                />
                {suggentionsToVisiblity && (
                    <LocationSelector
                        value={addRouteInps.ToLocationInp}
                        setter={setAddRouteInps}
                        pos={pos}
                        setvis={setSuggentionsToVisiblity}
                    />)}
            </div>
            <div>
                <label htmlFor="DepartureTime">Depature Time :</label>
                <input type="time" onChange={(e) => {
                    setAddRouteInps((prev) => ({
                        ...prev,
                        DepartureTime: e.target.value
                    }));
                }} value={addRouteInps.DepartureTime}
                />
            </div>
            <div>
                <label htmlFor="CostInp">Cost :</label>
                <input type="number" id='CostInp'
                    onChange={(e) => {
                        setAddRouteInps((prev) => ({
                            ...prev,
                            Cost: e.target.value
                        }));
                    }} value={addRouteInps.Cost}
                />
            </div>
            <div>
                <label htmlFor="">Days :</label>
                <WeekDays addedWeekDays={addedWeekDays} setAddedWeekDays={setAddedWeekDays} weekDays={weekDays} setAddRouteInps={setAddRouteInps} />
            </div>
            <button id='addRoutesButton' onClick={addRoute}>AddRoutes</button>
        </div>
    )
}
