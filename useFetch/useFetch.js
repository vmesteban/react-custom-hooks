import { useState, useEffect } from 'react';

const localCache = {};    




export const useFetch = ( url ) => {

    
    const [state, setstate] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null, 
    });

    useEffect(() => {
        getFetch();


    }, [url])

    const setLoadingState = () => {
        setstate({ 
            data: null,
            isLoading: true,
            hasError: false,
            error: null, 
        }); 
    }
    
    const getFetch = async() => {

        if ( localCache[url]) {
            console.log('Usando cache');
            setstate({ 
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null, 
            });
        
            return;
        }

        setLoadingState();

        const response = await fetch(url)

        // sleep
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if ( !response.ok ) { 
            setstate({ 
                data: null,
                isLoading: false,
                hasError: true,
                error: { 
                    code: response.status,
                    message: response.statusText,
                }    
            }); 

            return;
        } 

        const data = await response.json();
        setstate({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,
        })

        // console.log(data);
        localCache[url] = data;
    

    }

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  }
}
