import React, { useState } from 'react';


const TableData = ({ data }) => {
   const [filterText, setFilterText] = useState('');
   const [sortConfig, setSortConfig] = useState(null);
   const [currentPage, setCurrentPage] = useState(0);
   const itemsPerPage = 10;


   const handleFilterChange = (event) => {
       setFilterText(event.target.value);
       setCurrentPage(0); // Reset page to the first page when applying a filter
   };


   const handleSort = (columnName) => {
       let direction = 'asc';
       if (sortConfig && sortConfig.column === columnName && sortConfig.direction === 'asc') {
       direction = 'desc';
       }
       setSortConfig({ column: columnName, direction: direction });
   };


   const getData = () => {
       let filteredData = data.filter((item) => item.title.toLowerCase().includes(filterText.toLowerCase()));


       if (sortConfig !== null) {
       filteredData.sort((a, b) => {
           if (a[sortConfig.column] < b[sortConfig.column]) {
           return sortConfig.direction === 'asc' ? -1 : 1;
           }
           if (a[sortConfig.column] > b[sortConfig.column]) {
           return sortConfig.direction === 'asc' ? 1 : -1;
           }
           return 0;
       });
       }


       const startIndex = currentPage * itemsPerPage;
       const endIndex = startIndex + itemsPerPage;


       return filteredData.slice(startIndex, endIndex);
   };


   const pageCount = Math.ceil(data.length / itemsPerPage);


   const changePage = (newPage) => {
       setCurrentPage(newPage);
   };


   return (
       <>


           {/* search input */}
           <input type="text" value={filterText} onChange={handleFilterChange} placeholder="Search here..." className='py-2 px-4 rounded border border-gray-200 lg:w-4/12 md:w-6/12 sm:w-8/12 w-full' />


           {/* table */} 
           <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
               <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                   <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                       <tr>
                           <th scope="col" className="px-6 py-3">
                               #
                           </th>
                           <th scope="col" className="px-6 py-3 cursor-pointer" >
                               <div className="flex items-center" onClick={() => handleSort('title')}>
                                   Title
                                   <span ><svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></span>
                               </div>
                           </th>
                           <th scope="col" className="px-6 py-3 cursor-pointer">
                               <div className="flex items-center" onClick={() => handleSort('completed')}>
                                   Completed
                                   <span><svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></span>
                               </div>
                           </th>
                       </tr>
                   </thead>
                   <tbody>
                       {getData().map((item, index) => (
                           <tr className="bg-white border-b " key={ item.id }>
                               <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                   { index + 1 }
                               </th>
                               <td className="px-6 py-4">
                                   { item.title }
                               </td>
                               <td className="px-6 py-4">
                                   { item.completed ? 'Yes' : 'No' }
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>


          
           <div className='mt-5 text-right'>
               <button className={currentPage === 0 ? 'bg-gray-200 px-4 py-2 rounded text-slate-800' : 'bg-blue-500 px-4 py-2 rounded text-white'} disabled={currentPage === 0} onClick={() => changePage(currentPage - 1)}>
                   Previous
               </button>
               <button className={currentPage === pageCount - 1 ? 'bg-gray-200 px-4 py-2 rounded text-slate-800 ml-4' : 'bg-blue-500 px-4 py-2 rounded text-white ml-4'} disabled={currentPage === pageCount - 1} onClick={() => changePage(currentPage + 1)}>
                   Next
               </button>
           </div>


       </>
   );
};


export default TableData;