import React,{useState} from 'react'
import Arrowright from '../../../../lottiefiles/resumesuccess.json'
import Lottie from 'lottie-react'
import { InfinitySpin } from "react-loader-spinner";
import { Link,useNavigate } from 'react-router-dom';
const Final = () => {

  const[isloading,setIsloading]=useState()

  const navigate=useNavigate()
  return (
    <div>
    <div className="bg-white mx-auto my-3 flex flex-col w-full   max-w-2xl "
> <Lottie animationData={Arrowright}  loop={false}  className='w-[13rem] m-auto'/>

</div>
<div className='flex-col'>
  <div>
  <strong class="text-xl font-bold text-siteviolet sm:text-xl">
       Success!
</strong> 
  </div>

  <div>
  <strong class="text-xl text-siteviolet sm:text-xl">
  Your Account Has Been Created
</strong> 
  </div>
  <p className='text-gray-500 text-sm pt-4'>now lets find the right job for you.</p>

</div>

{isloading ? (
                    <div className="mb-4 mt-5 flex justify-center ">
                      <InfinitySpin width="200" color="#194569" />
                    </div>
                  ) : (
                    <div className="mt-8">
                      <button className="bg-siteviolet text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" onClick={()=>navigate("/findjobs")}>
                        Search Jobs
                      </button>
                    </div>
                  )}
</div>
  )
}

export default Final
