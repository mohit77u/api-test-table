import React, { useState, useEffect } from 'react';
import TableData from './components/TableData';


function App() {


   const [data, setData] = useState([]);


   // get data from api
   const getData = async() => {
       fetch('https://jsonplaceholder.typicode.com/todos')
           .then(response => response.json())
           .then((data) => {
               setData(data.slice(0, 100))
           })
   }
   useEffect(() => {
       getData();
   }, [])


   return (
       <div className="lg:w-8/12 md:w-10/12 w-11/12 py-12 px-4 mx-auto">
           <h1 className="text-3xl font-bold mb-4">
               Table Data
           </h1>


           {/* table */}
           <TableData data={data} />
       </div>
   );
}


export default App;