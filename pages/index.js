import Head from 'next/head'
import axios from 'axios'
import { useState } from 'react'
import {BsSearch} from 'react-icons/bs'
import Image from 'next/image';
import Weather from '../components/Weather';
import Spinner from '../components/Spinner';


export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  const fetchWeather = (e) => {
   e.preventDefault()
   setLoading(true)
   axios.get(url).then((response) => {
    setWeather(response.data)
   })
   setCity('')
   setLoading(false)
  }

  // show spinner on loading 
  if(loading) {
    return <Spinner />
  } else {
    return (
      <>
      <Head>
        <title>Weather App</title>
      </Head>
      <div className=' absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]'/>
          <Image 
          fill
          className='object-cover'
          src='https://images.unsplash.com/photo-1527482797697-8795b05a13fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80' 
          />
          {/* search */}
          <div className='relative top-0 left-0 flex justify-between items-center max-w-[500px] m-auto w-full text-white z-50 p-4'>
            <form 
            onSubmit={fetchWeather}
            className='flex justify-between items-center w-full m-auto p-3 bg-transparent border-white-300 text-white rounded-2xl border shadow-sm shadow-white'>
              <div>
                <input 
                type="text" 
                placeholder='Search City' 
                className=' bg-transparent border-none text-white focus:outline-none text-xl max-w-[400px] w-full'
                onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <button onClick={fetchWeather} className=""><BsSearch size={20}/></button>
            </form>
          </div>
          {/* weather */}

          {weather.main && <Weather data={weather}/>}
    </>
    )
  }
}
