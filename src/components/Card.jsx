
import React, { useEffect, useState } from 'react';
import Assicard from './Assicard';

const Card = () => {
    const [itemPerPages, setItemPerPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [count,setCount] = useState(49)
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/productsCount')
        .then(res =>res.json())
            .then(data => {
                setItemPerPages(data.count)
                setCount(data.count)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [itemPerPages,count,currentPage]);
    const numberofPages = Math.ceil(count / itemPerPages);
    const pages = [...Array(numberofPages).keys()];
    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemPerPages}`)
            .then(res => res.json())
            .then(data => setItems(data))
    }, [currentPage,itemPerPages]);
    const handleItemsperpages = e =>{
       
        const val = parseInt(e.target.value)
        setItemPerPages(val)
        setCurrentPage(0)
    }

    const handlePrevs = e =>{
            if(currentPage > 0){
              setCurrentPage(currentPage - 1)
            }
      }
      
      const handleNexts = ()=>{
           if(currentPage <pages.length - 1){
            setCurrentPage(currentPage + 1)
           }
      }

    return (
        <div>
        <div className="mt-20 grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 lg:space-y-10 space-y-5 lg:ml-4 md:ml-[200px]">
        {items.map((data, index) => (
          <Assicard data={data}></Assicard>
        ))}
      </div> 
        </div>
    );
};

export default Card;