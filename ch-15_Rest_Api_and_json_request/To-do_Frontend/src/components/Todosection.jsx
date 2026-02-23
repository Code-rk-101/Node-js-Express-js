import TodoItem from "./Todoitem";

function Todosection({ items, onDeleteClick, onCompleteClick }) 
{
  
  return (
    <div className="bg-gray-50 rounded-lg shadow mt-6 p-4">
      {items.map((Item) => (
        <TodoItem
          key={Item.id}
          item={Item}
          onDeleteClick={onDeleteClick}
          onCompleteClick={onCompleteClick}
        />
      ))}
    </div>
  );
}

export default Todosection;
