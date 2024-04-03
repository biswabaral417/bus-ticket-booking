import React, { useEffect, useMemo, useState } from 'react';

export default function ChooseRoute({ CRvalue, setter, setvisCR }) {
    const [suggestRoutes, setSuggestRoutes] = useState([]);

    useEffect(() => {
        const getRoutes = async () => {
            try {
                const response = await fetch("/api/routes");
                const data = await response.json();
                setSuggestRoutes(data.routes); // Assuming your API returns an object with a 'routes' array
            } catch (error) {
                console.error("Error fetching routes:", error);
            }
        };


        getRoutes(); // Call the function to fetch routes when component mounts
        if (CRvalue.trim() === "") {
            setvisCR(false);
        }
    }, [CRvalue, setvisCR]);


    const setCurrentRoute = (route) => {
        setter(route);
        setvisCR(false);
    };

    // Memoize the filtered routes
    const filteredRoutes = useMemo(() => {
        const [fromLocation, toLocation] = CRvalue.toLowerCase().split("to").map(location => location.trim());

        // Check if toLocation exists, if not, use fromLocation for comparison
        const locationToCheck = toLocation ? toLocation : fromLocation;

        return suggestRoutes.filter((route) => {
            const routeFrom = route.From.toLowerCase();
            const routeTo = route.To.toLowerCase();

            // Check if locationToCheck exists in route's From or To
            const includesLocation = routeFrom.includes(locationToCheck) || routeTo.includes(locationToCheck);

            // If toLocation exists, check if both fromLocation and toLocation are included
            // If toLocation doesn't exist, just check if locationToCheck is included
            if (toLocation) {
                return includesLocation && (routeFrom.includes(fromLocation) || routeTo.includes(fromLocation));
            } else {
                return includesLocation;
            }

        });
    }, [suggestRoutes, CRvalue]);



    return (
            <div className={`theRoutesChoser d-flx flx_column`} id="theRoutesChoser">
                {filteredRoutes.map((route, i) => (
                    <button type="button" key={`suggestRoute_${i}`} onClick={() => setCurrentRoute(route)}>
                        <p>{`${route.From} to ${route.To}`}</p>
                        <p>{`Departure: ${route.StartTime}`}</p>
                        <p>{`Days: ${route.Days.join(", ")}`}</p>
                    </button>
                ))}
            </div>
    )
}
