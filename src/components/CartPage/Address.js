import { useRef, useState, useEffect } from "react";
import { GlobalState } from "../Context";

const Address = () => {
  const { toggleBtn, address, setDefault, DeleteAds } = GlobalState()
  // const [editText, seteditText] = useState('')
  const changeBtn = useRef()
  const addBtn = useRef()
  // const editAds = (i) => {
  //   seteditText(i)
  // }
  return (
    <>
      <div className="m-2 lg:mx-auto max-w-5xl justify-center bg-white p-4 rounded mb-4 shadow-md">
        {address?.length !== 0 ?
          <>
            <div className="flex flex-col sm:flex-row justify-between">
              <h2 className="font-bold text-lg text-purple-600">Delivering To This Address....</h2>
              <div className="flex items-center justify-between space-x-4">
                {address && address.filter(i => i.Default).map((i) => (
                  <div key={i.id}>
                    <h2 className="font-bold text-black">{i.firstName} {i.lastName}, {i.State}, {i.Pin}</h2>
                  </div>
                ))}
                <button className="bg-white text-purple-500 border border-purple-500 py-2 px-6 rounded w-fit hover:bg-purple-950" onClick={() => toggleBtn(changeBtn)}>Change</button>
              </div>
            </div>
            <div ref={changeBtn} className='hidden'>
              <div className="flex justify-start flex-col items-center min-[490px]:flex-row flex-wrap">
                {address?.length !== 0 && address.map((i) => (
                  <div key={i.id} className="bg-purple-400 text-center rounded-md h-28 p-4 m-2 group">
                    <h2 className="font-bold text-black">{i.firstName} {i.lastName}</h2>
                    <p>{i.road}, {i.District}</p>
                    <p>{i.State} - {i.Pin}</p>
                    <p className="font-bold">{i.ConNumber}</p>
                    <div className="relative bottom-12 hidden group-hover:block">
                      <div className="bg-white rounded justify-evenly flex">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onClick={() => setDefault(i.id)}
                          className={`${i.Default ? 'pointer-events-none opacity-60' : ''} text-purple-950 cursor-pointer w-6 h-6 m-2`}>
                          <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onClick={() => DeleteAds(i.id)} className="text-green-400 cursor-pointer w-6 h-6 m-2">
                          <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-purple-400 rounded-md w-fit p-4 m-2 flex items-center flex-col">
                  <button className="font-bold text-black" onClick={() => toggleBtn(addBtn)}>Add New Address</button>
                </div>
              </div>
              <div className="hidden" ref={addBtn}>
                <AddData />
              </div>
            </div>

          </>
          :
          <>
            <div className="flex justify-between">
              <h2 className="font-bold text-lg text-purple-600">Add New Address</h2>
              <button className="bg-purple-500 text-white py-2 px-6 rounded w-fit hover:bg-purple-950" onClick={() => toggleBtn(addBtn)}>Add</button>
            </div>
            <div className="hidden" ref={addBtn}>
              <AddData />
            </div>
          </>
        }
      </div>
    </>
  )
}

export default Address;

export const AddData = ({ updatetext }) => {
  // console.log(updatetext?.firstName)
  const { saveAddress } = GlobalState()
  const [formData, setformData] = useState({
    firstName: '',
    id: Math.floor(Math.random() * 10000).toString(),
    lastName: '',
    road: '',
    District: '',
    State: '',
    Pin: '',
    ConNumber: '',
    Default: false
  });
  useEffect(() => {
    if (updatetext) {
      setformData(updatetext);
    }
  }, [updatetext]);
  const typeAds = (e) => {
    const { name, value } = e.target
    let isChecked = e.target.checked

    if (name === 'Default') {
      setformData((i) => ({
        ...i,
        [name]: isChecked
      }))
    } else {
      setformData((i) => ({
        ...i,
        [name]: value
      }))
    }
  }
  const addAdrs = (e) => {
    e.preventDefault()
    saveAddress(formData)
    setformData({
      firstName: '',
      lastName: '',
      road: '',
      District: '',
      State: '',
      Pin: '',
      ConNumber: '',
      Default: false
    })

    // console.log(formData)
  }
  return (
    <>
      <form onSubmit={addAdrs} className={`transition ease-in-out delay-150`} >
        <div className="grid md:grid-cols-2 md:gap-6 m-4">
          <div className="relative z-0 w-full mb-6 group">
            <input type="text" name="firstName" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
              onChange={typeAds} value={formData.firstName} />
            <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input type="text" name="lastName" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={typeAds} value={formData.lastName} />
            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input type="text" name="road" id="address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={typeAds} value={formData.road} />
            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Road & Landmark</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input type="text" name="District" id="district" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={typeAds} value={formData.District} />
            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">District</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input type="text" name="State" id="state" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={typeAds} value={formData.State} />
            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input type="text" name="Pin" id="pin" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={typeAds} value={formData.Pin} />
            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pin</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input type="number" name="ConNumber" id="ConNumber" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={typeAds} value={formData.ConNumber} />
            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact Number</label>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative z-0 w-full mb-6 group">
            <input type="checkbox" name="Default" id="pin" className="" onChange={typeAds} checked={formData.Default} />
            <label htmlFor="floating_last_name" className="font-bold ml-3 text-sm text-gray-600">Set Default Address</label>
          </div>
          <button className="bg-purple-500 text-white py-2 px-6 rounded w-fit hover:bg-purple-950">Save</button>
        </div>
      </form>
    </>
  )
}