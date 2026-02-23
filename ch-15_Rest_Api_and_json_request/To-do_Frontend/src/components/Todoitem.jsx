function TodoItem({ item, onDeleteClick, onCompleteClick }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-3 border-b border-gray-200 ">
      <div className={"flex-1 font-medium " + (item.completed ? "text-gray-500 line-through" : "text-gray-800")}>{item.task}</div>
      <div className={"flex-1  "+ (item.completed ? "text-gray-500 line-through" : "text-gray-500")}>{item.date}</div>
      <button
        type="button"
        className={"px-3 py-2   font-bold rounded  transition flex items-center gap-2"+ (item.completed ? "text-white bg-gray-500 line-through " : " bg-blue-500 hover:bg-blue-600 text-white")}
        onClick={() => (item.completed ? "" : onCompleteClick(item.id))}
        disabled={item.completed}
      >
        {item.completed?"":
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>}
        
        {item.completed ? "Completed" : "Complete"}
      </button>
      <button
        type="button"
        className={"px-3 py-2 font-bold rounded  transition flex items-center gap-2 "+ (item.completed ? "text-white bg-gray-500 hover:bg-gray-600" : "bg-red-500 hover:bg-red-700 text-white")}
        onClick={() => onDeleteClick(item.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
