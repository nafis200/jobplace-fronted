

import { Slide } from 'react-awesome-reveal'

const Assicard = ({data}) => {
      const {
        brandName,
        category,
        price,
        date,
        image,
        description
        } = data
    return (
        <div>
      <div className="card lg:w-96 md:w-96 w-72 bg-base-100 shadow-xl ml-7">
      <Slide direction={'down'}>
      <figure>
        <img
          className="w-[300px] lg:w-full md:w-full"
          src={image}
          alt="Shoes"
        /> 
      </figure>
      </Slide>
      <div className="card-body">
      <Slide direction={'left'}><h2 className="card-title mt-9"><span className='flex mb-7 lg:mb-7 md:mb-7'></span> <span className="font-extralight">BrandName:</span> {brandName}</h2> </Slide>
       <Slide direction={'right'}><h2 className='font-bold flex items-center gap-2'>  Category <span className='text-red-500'>{category}</span> </h2></Slide>
       <Slide direction={'left'}><h2 className='font-bold flex items-center gap-2'> <span className="flex items-center gap-2">  <span className="text-orange-400">Price</span>  </span> {price}</h2></Slide> 
       <Slide direction={'right'}><h2 className='font-bold flex items-center gap-2'><span className="flex items-center gap-2">  <span className="text-orange-400">Date</span></span> {date}</h2> </Slide>
       <Slide direction={'right'}><h2 className='font-bold flex items-center gap-2'><span className="flex items-center gap-2">  <span className="text-orange-400">Description</span></span> {description}</h2> </Slide>
      </div>
      
    </div>
    </div>
    );
};

export default Assicard;