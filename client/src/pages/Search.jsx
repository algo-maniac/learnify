import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const Search=()=>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const fetchHandler=async()=>{
        const res=await fetch("/search",{
            method:'GET',
            body:JSON.stringify({query:query})
        })
        const data=await res.json();
        console.log(data)
    }
    useEffect(()=>{
        fetchHandler();
    },[query])
    return <>
        <h1>{query}</h1>
    </>
}
export default Search