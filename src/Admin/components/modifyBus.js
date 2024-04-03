import React, { useState } from 'react'
import ChooseRoute from './ChooseRoute';

export default function ModifyBus() {
    const [modifyBusInp, setModifyBusInp] = useState({
        AgencyInp: '',
        busNumber: '',
        busRows: '',
        disable: false
    })
    const modifyBus = async () => {
        const res = await fetch("/api/modifyBus", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ modifyBusInp, routeId: route._id }),

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
        setModifyBusInp((prevInput) => ({
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
                    <h1>Modify Buses</h1>
                    <div>
                        <label htmlFor="busNumber" >Bus Number</label>
                        <input type="text" id='busNumber' onChange={ChangeAddBusInp} value={modifyBusInp.busNumber} />
                    </div>
                    <label htmlFor="RoutesInp">Search Routes</label>
                    <input type="text" name="fromInp" id="fromInp" placeholder='from or tolocatins' onChange={(e) => { setCRvalue(e.target.value); setvisCR(true) }} value={CRvalue} />
                    {
                        visCR && <ChooseRoute CRvalue={CRvalue} setter={setRoute} setvisCR={setvisCR} />
                    }
                    <div>
                        <label htmlFor="AgencyInp">Agency Name</label>
                        <input type="text" id='AgencyInp' onChange={ChangeAddBusInp} value={modifyBusInp.AgencyInp} />
                    </div>
                    <div>
                        <label htmlFor="busRows"  >Bus Rows</label>
                        <input type="Number" id="busRows" onChange={ChangeAddBusInp} value={modifyBusInp.busRows} />
                    </div>
                    <div>
                        <label htmlFor="disable">Disable bus service</label>
                        <input type="checkbox" name="disable" id="disable" onChange={(e) => {
                            setModifyBusInp((prev) =>
                            ({
                                ...prev,
                                disable: e.target.value === "checked" ? true : false
                            }))
                        }
                        }
                            value={modifyBus.disable ? "checked" : "unchecked"}
                        />
                    </div>
                    <button id='addBusButton' onClick={modifyBus}>Add Bus</button>

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

