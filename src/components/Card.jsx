import React, { useEffect, useState } from 'react';
import Assicard from './Assicard';

const Card = () => {
    const [itemPerPages, setItemPerPages] = useState(49);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(49);
    const [items, setItems] = useState([]);
    const [str, setStr] = useState("");
    const [role, setRole] = useState("");

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
    console.log(items)

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
            <div className="mt-20 grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 lg:space-y-10 space-y-5 lg:ml-4 md:ml-[200px]">
                {items.map((data) => (
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
