import axios from "axios";
import { useEffect, useState } from "react";


 export default function useFetch(){

    
     async function getTranding(medaType, callback){
      try {
        const {data} =  await axios.get(`https://api.themoviedb.org/3/trending/${medaType}/week?api_key=4f7b984f727881db7eefac33fad4c1d0`);
        callback(data.results);
  
        
      } catch (error) {
        console.log(error.message)
      }
      }

      
useEffect(()=>{
    getTranding('movie',setTradingMovies);
    getTranding('person',settradingPeople);
    getTranding('tv',settradingTv);
  },[])

return {tradingMovies , tradingPeople ,tradingTv}

 }