import React from 'react'

function Forecast({title, items}) {
  console.log(items);
  return (
    
    <div>
        <div className="flex items-center justify-start mt-6">
            <p className="font-medium text-white uppercase">{title}</p>
            
        
        </div>
        <hr className="my-2"/>
        <div className="flex flex-row justify-between items-center text-white">
        {items.map((item)=>(
            <div className="flex flex-col justify-between items-center text-white">
            <p className="font-light text-sm">{item.title}</p>
            <img
              src="http://openweathermap.org/img/wn/01d@2x.png"
              alt=""
              className="w-12 my-1"
            />
            <p className="text-white font-light text-sm">{`${item.temp.toFixed()}°`}</p>
            </div>
          )
           
          )}
        
            
            
        </div>
    </div>
  );
}

export default Forecast;