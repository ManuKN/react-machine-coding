import { useCallback, useEffect, useRef, useState } from "react"

const InterviewPrep = () =>{
    const [data , setData] = useState([]);
    const [page , setPage] = useState(1);
    const [isLoading , setIsLoading] = useState(false);
    const [hasMore , setHasMore] = useState(true);
    const observerRef = useRef(null);

    const fetchData = (page) =>{
        return new Promise((resolve , reject) =>{
            setTimeout(() =>{
              const newData = Array.from({length:10} , (_  , i) =>`Item ${i +1 + (page - 1)* 10}`);
              resolve(newData)
            } , 1000)
        })
    }

    useEffect(() =>{
        const loadData = async() =>{
            setIsLoading(true);
            const newItems = await fetchData(page);
            if(!newItems.length){
                setHasMore(false)
            }
            setData((prev) => [...prev , ...newItems])
            setIsLoading(false)
        }
        if(hasMore){
            loadData()
        }
    } ,[page])

    const handleObserver = useCallback((entries) =>{
        const target = entries[0];
        if(target.isIntersecting && !isLoading && hasMore){
               setPage((prev) => prev + 1)
        }
    },[isLoading , hasMore])

    useEffect(() =>{
        const observer = new IntersectionObserver(handleObserver , {threshold:0.1});
        if(observerRef.current) observer.observe(observerRef.current)
            return () => observer.disconnect()
    },[handleObserver])

    return(
        <div>
      <h1>Infinite Scroll (Optimized)</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>No more data to load</p>}
      {/* Invisible div as the trigger point */}
      <div ref={observerRef} style={{ height: "20px", backgroundColor: "transparent" }} />
    </div>
    )
}

export default InterviewPrep