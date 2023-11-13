import { GlobalState } from "../Context";


const FilterBar = ({ data, handleClick }) => {
  return (
    <>
      <div className="flex flex-shrink-0 justify-start">
        {Object.keys(data).length > 0 && Object.keys(data).map((i) => (
          <BarOption value={data[i]} topic={i} handleClick={handleClick} />
        ))}
      </div>
    </>
  )
}

export default FilterBar;


export const BarOption = ({ topic, value }) => {
  const { FilterBy, filterCheck, FilterByValue } = GlobalState()
  const instantRemove = (i)=>{
    let update = filterCheck(i,FilterBy)
    FilterByValue(update)
  }
  return (
    <>
      {value && Object.keys(value).map((i, index) => (
        <div className="text-white flex-shrink-0 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm py-2 px-4 shadow-md shadow-purple-500 h-fit ml-4 flex" key={index}><p>{value[i]}</p>
          <span className="ml-2" >
            <label><input type='checkbox' name={topic} value={value[i]} onChange={instantRemove} className="opacity-0 absolute cursor-pointer w-4 h-4 -ml-2.5" checked={FilterBy[topic]?.includes(value[i])} />
              <svg aria-hidden="true" className="w-3.5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></label>
          </span></div>
      ))}
    </>
  )
}