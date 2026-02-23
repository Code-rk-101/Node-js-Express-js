import "./App.css";
import Heading from "./components/heading";
import Add_to_do from "./components/add_to";
import Todosection from "./components/Todosection";
import WelcomeMessage from "./components/welcomeMessage";
import WarningMessage from "./components/warning_message";
import { useState } from "react";
import {
  addItemToServer,
  deleteItem,
  getItemList,
  updateItem,
} from "./services/itemServices";
import { useEffect } from "react";

function App() {
  const initalTodoItems = [];
  const [todoitems, setTodoItems] = useState(initalTodoItems);
  const [track, setTrack] = useState(false);

  const todoItem = todoitems.filter((item) => item.completed === false);
  const completedItem = todoitems.filter((item) => item.completed === true);
  const finalItems = todoItem.concat(completedItem);

  useEffect(() => {
    const getFunc = async () => {
      const itemList = await getItemList();
      setTodoItems(itemList);
    };
    getFunc();
  }, []);

  const handleOnChange = async (taskVal, dueDateVal) => {
    if (taskVal && dueDateVal) {
      setTrack(false);
      const [item] = await addItemToServer(taskVal, dueDateVal);
      setTodoItems(() => {
        return [...todoitems, item];
      });
    } else {
      setTrack(true);
    }
  };

  const onCompleteClick = async (id) => {
    const [updatedItem] = await updateItem(id);
    // Update the completed status in place
    const updatedList = todoitems.map((item) =>
      item.id === updatedItem.id ? { ...item, completed: true } : item,
    );
    // Reorder: incomplete first, then completed
    const todoItem = updatedList.filter((item) => item.completed === false);
    const completedItem = updatedList.filter((item) => item.completed === true);
    setTodoItems([...todoItem, ...completedItem]);
  };

  const handleOnDelete = async (id) => {
    const deletedId = await deleteItem(id);
    const newTodoItems = todoitems.filter((item) => item.id != deletedId);
    setTodoItems(newTodoItems);
  };
  const handleOnClickChange = () => {
    setTrack(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-green-100 flex flex-col items-center py-8">
      <div className="w-full max-w-2xl mx-auto">
        <Heading />
        <Add_to_do handleOnClick={handleOnChange} />
        <WarningMessage
          track={track}
          onClickChange={handleOnClickChange}
        />
        {todoitems.length === 0 && <WelcomeMessage />}
        <Todosection
          items={finalItems}
          onDeleteClick={handleOnDelete}
          onCompleteClick={onCompleteClick}
        />
      </div>
    </div>
  );
}

export default App;
