import { useRef } from 'react';


function Add_to_do ({handleOnClick})
{
  const taskVal = useRef();
  const dueDateVal = useRef();

  const handleAddButtonClicked = ()=>
  {
    const currTaskVal = taskVal.current.value;
    const currDueDateVal = dueDateVal.current.value;

      handleOnClick(currTaskVal,currDueDateVal);
      taskVal.current.value = "";
      dueDateVal.current.value = "";
  }



  return(
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow">
      <input 
        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
        type="text" 
        required 
        placeholder="Enter the task" 
        ref={taskVal}
      />
      <input 
        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
        type="date" 
        required 
        ref={dueDateVal}
      />
      <button 
        type="button" 
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center gap-2"
        onClick={handleAddButtonClicked}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add
      </button>
    </div>
  );
}

export default Add_to_do;