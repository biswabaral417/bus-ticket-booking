import React, { useState } from 'react'
import ChooseRoute from './ChooseRoute';

export default function AddBus() {
    const [addBusInp, setAddBusInp] = useState({
        AgencyInp: '',
        busNumber: '',
        busRows: '',
    })
    const addBus = async () => {
        const res = await fetch("/api/addbus", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ addBusInp, routeId: route._id }),

        });
        const data = await res.json()
        if (res.status === 201) {
            window.alert(data.success)
        }
        else {
            window.alert(data.error)
        }
    }
    const ChangeAddBusInp = (e) => {
        const { id, value } = e.target;
        setAddBusInp((prevInput) => ({
            ...prevInput,
            [id]: value,
        }));
    };
    const [CRvalue, setCRvalue] = useState('')
    const [route, setRoute] = useState({})
    const [visCR, setvisCR] = useState(false)
    // useMemo(() => , [])
    return (
        <>
            <div className='d-flx theAddBusComp' >

                <div className=''>
                    <h1>Add Buses</h1>
                    <label htmlFor="RoutesInp">Search Routes</label>
                    <input type="text" name="fromInp" id="fromInp" placeholder='from or tolocatins' onChange={(e) => { setCRvalue(e.target.value); setvisCR(true) }} value={CRvalue} />
                    {
                        visCR && <ChooseRoute CRvalue={CRvalue} setter={setRoute} setvisCR={setvisCR} />
                    }
                    <div>
                        <label htmlFor="AgencyInp">Agency Name</label>
                        <input type="text" id='AgencyInp' onChange={ChangeAddBusInp} value={addBusInp.AgencyInp} />
                    </div>
                    <div>
                        <label htmlFor="busNumber" >Bus Number</label>
                        <input type="text" id='busNumber' onChange={ChangeAddBusInp} value={addBusInp.busNumber} />
                    </div>
                    <div>
                        <label htmlFor="busRows"  >Bus Rows</label>
                        <input type="Number" id="busRows" onChange={ChangeAddBusInp} value={addBusInp.busRows} />
                    </div>

                    <button id='addBusButton' onClick={addBus}>Add Bus</button>

                </div>
                <div className='theChosenRoute' style={{ margin: " 0px 50px", fontSize: "25px" }}>
                    {route.From && route.To && (
                        <>
                            <h3>selected route</h3>
                            <p>{`${route.From} to ${route.To}`}</p>
                        </>
                    )}
                    {route.StartTime && (
                        <p>{`Departure: ${route.StartTime}`}</p>
                    )}
                    {route.Days && route.Days.length > 0 && (
                        <p>{`Days: ${route.Days.join(", ")}`}</p>
                    )}
                </div>
            </div>
        </>
    )
}

