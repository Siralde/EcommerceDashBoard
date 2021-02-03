import { useState, useEffect } from 'react';

export default function useFetch(url, opts) {
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        
        fetch(url, opts)
        .then( data => {
            // console.log(data.json().then( e => console.log(e)))
            data.json().then( e => setResponse(e) );
            setLoading(false)
        })
        .catch(() => {
                setHasError(true)
                setLoading(false)
        })

    }, [ url ])
    
    return [ response, loading, hasError ]
}