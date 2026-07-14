import React from 'react'


const Stats = [ 
  {count: "20+", label: "Workers"},
  {count: "100+", label: "Customers"}
];

const StatsComponent = () => {
  return (
    <section>
      <div>
        <div className='flex gap-x-5 items-center justify-around bg-gray-700 text-bold'>
          {
            Stats.map( (data, index) => {
              return (
                <div key={index}>
                  <h1>
                    {data.count}
                  </h1>
                  <h2>
                    {data.label}
                  </h2>
                </div>
              )
            })
          }
          
        </div>
      </div>
    </section>
  )
}

export default StatsComponent
