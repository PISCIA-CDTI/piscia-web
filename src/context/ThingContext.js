import React, {useEffect, useState} from "react";

const ThingContext = React.createContext();

const ThingContextProvider = (props) => {
    const [things, setThings] = useState([]);
    const [thingsMap, setThingMap] = useState([]);
    const standardColorMarker = [
        'Blue',
        'Gold',
        'Red',
        'Green',
        'Orange',
        'Yellow',
        'Violet',
        'Grey',
        'Black'
    ];
    const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
    useEffect(() => {
        fetch(apiUrl+'/things')
            .then(response => response.json())
            .then (data => {
                setThings(data);
                setThingMap(data.map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        color: standardColorMarker[Math.floor(Math.random() * standardColorMarker.length)],
                        geo: {
                            lat: item.geometry.coordinates[0],
                            long: item.geometry.coordinates[1]
                        }
                    }
                }));
            });
    }, []);

    return (
        <ThingContext.Provider value={{
            things,
            thingsMap
        }}>
            {props.children}
        </ThingContext.Provider>
    )
}

export {ThingContextProvider, ThingContext}