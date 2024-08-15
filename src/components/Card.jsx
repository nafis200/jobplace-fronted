import React, { useEffect, useState } from 'react';
import Assicard from './Assicard';
import { IoIosArrowDropdown } from "react-icons/io";
import axios from 'axios';
const Card = () => {
    const [itemPerPages, setItemPerPages] = useState(49);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(49);
    const [items, setItems] = useState([]);
    const [str, setStr] = useState("");
    const [role, setRole] = useState("");

    const [brandname, setBrandname] = useState('');
    const [category,setCategory] = useState('')
    const [price,setPrice] = useState()

    useEffect(() => {
        fetch('http://localhost:5000/productsCount')
            .then(res => res.json())
            .then(data => {
                setItemPerPages(data.count);
                setCount(data.count);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemPerPages}`)
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [currentPage, itemPerPages]);

    useEffect(() => {
        if (role) {
            fetch(`http://localhost:5000/search/${role}`)
                .then(res => res.json())
                .then(data => setItems([data]))
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    }, [role]);

    const numberOfPages = Math.ceil(count / itemPerPages);
    const pages = [...Array(numberOfPages).keys()];

    const handleItemsPerPage = (e) => {
        const val = parseInt(e.target.value);
        setItemPerPages(val);
        setCurrentPage(0);
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < numberOfPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const Search = () => {
        setRole(str);
    };
    const sortByPriceAsc = () => {
        const sortedItems = [...items].sort((a, b) => a.price - b.price);
        setItems(sortedItems);
    
    };

    const sortByPriceDesc = () => {
        const sortedItems = [...items].sort((a, b) => b.price - a.price);
        setItems(sortedItems);
        
    };

    const sortByNewest = () => {
        const sortedItems = [...items].sort((a,b)=>new Date(b.date) - new Date(a.date))
        setItems(sortedItems)
    };
   
    const handleBrandChange = (e) => {
        const val = e.target.value;
        setBrandname(val);
    };

    const handlecategory = (e) => {
        const val = e.target.value;
        setCategory(val);
    };

    const handleprice = (e) => {
        const val = parseInt(e.target.value);
        setPrice(val);
    };

    const deletebrand = ()=>{
        setBrandname("")
    }

    const deletecategory = ()=>{
         setCategory("")
    }
    const deleteprice = ()=>{
         setPrice("")
    }
   const serachitem = async()=>{
    try {
        const response = await axios.post('http://localhost:5000/search', {
            brandName:brandname,
            price: price ? parseInt(price) : undefined,
            category:category
        });
        setItems(response.data);
    } catch (error) {
        console.error('Error searching for products', error);
    }

   }
    return (
        <div>   
             <div className="flex justify-center mx-auto p-4">
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-info w-full max-w-xs rounded-3xl"
                    onChange={(e) => setStr(e.target.value)}
                />
                <button
                    onClick={Search}
                    className="btn btn-active btn-primary ml-2 rounded-2xl"
                >
                    Search
                </button>
            </div>
            <section className="container mx-auto flex justify-center">
        <div className="dropdown dropdown-bottom ">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 bg-blue-400 text-center lg:w-[100px] p-2 text-white mt-5"
          >
            <span className=" flex items-center gap-2">
              Sort price
              <IoIosArrowDropdown className="lg:text-2xl"></IoIosArrowDropdown>{" "}
            </span>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
             <li>
                <a onClick={sortByPriceAsc}>Low to high</a>
            </li>
            <li>
                <a onClick={sortByPriceDesc}>High to low</a>
            </li>
            <li>
                <a onClick={sortByNewest}>Neweat date</a>
            </li>
          </ul>
        </div>
      </section>
      <h1 className="text-center mt-5 font-bold">Choose by category brandname and price</h1>
      <section className='flex justify-around mt-10'>
             <div>
                <label>Brand Name:</label>
                <select className="select select-bordered" value={brandname} onChange={handleBrandChange}>
                    <option value="Brand Alpha">Brand Alpha</option>
                    <option value="Brand Beta">Brand Beta</option>
                    <option value="Brand Gamma">Brand Gamma</option>
                </select>
                {
                    brandname && <div className='flex space-x-2 mt-5'>
                     <h1 className='mt-2'>{brandname}</h1>
                     <button onClick={deletebrand} className='btn w-20'>X</button>
                    </div>
                }
            </div>
            <div>
                <label>Category Name:</label>
                <select className="select select-bordered" value={category} onChange={handlecategory}>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home Goods">Home Goods</option>
                </select>
                {
                     
                     category && <div className='flex space-x-2 mt-5'>
                     <h1 className='mt-2'>{category}</h1>
                     <button onClick={deletecategory} className='btn w-20'>X</button>
                    </div>
                }
            </div>
            <div>
                <label>Price:</label>
                <select className="select select-bordered" value={price} onChange={handleprice}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                </select>
                {
                     price && <div className='flex space-x-2 mt-5'>
                    <h1 className='mt-2'>{price}</h1>
                    <button onClick={deleteprice} className='btn w-20'>X</button>
                   </div>
                }
            </div>
            <div>
                {
                    (brandname || category || price) && <button className="btn" onClick={serachitem}>Search</button>
                }
            </div>
             </section>
            <div className="mt-20 grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 lg:space-y-10 space-y-5 lg:ml-4 md:ml-[200px]">
                {items?.map((data) => (
                    <Assicard key={data._id} data={data} />
                ))}
            </div>
            <section className="text-center">
                <p className="mt-8">Current Page: {currentPage + 1}</p>
                <button onClick={handlePrev} className="btn mt-4" disabled={currentPage === 0}>Prev</button>
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`btn ${currentPage === page ? 'bg-blue-400' : ''}`}
                    >
                        {page + 1}
                    </button>
                ))}
                <button onClick={handleNext} className="btn" disabled={currentPage === numberOfPages - 1}>Next</button>

                <select value={itemPerPages} onChange={handleItemsPerPage} name="" id="">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value={`${count}`}>{count}</option>
                </select>
            </section>
        </div>
    );
};

export default Card;