export const addItemToServer = async (task,date)=>
{
    const response = await fetch('http://localhost:5000/api/todo',
    {
        method:'POST',
        headers:
        {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({task,date}),
    });
    const data = await response.json();
    return mapServerItemToLocalItem([data]);
};

export const getItemList = async ()=>
{
    const itemList = await fetch('http://localhost:5000/api/todo/itemList',
        {
            method: "GET",
        }
    );
    const items = await itemList.json();
    return mapServerItemToLocalItem(items);
}

export const mapServerItemToLocalItem = (serverItems)=>
{
    let allitem = [];
    serverItems.map((item)=>
    {
        item.date = item.date.split('T')[0];
        allitem = 
        [
            ...allitem,
            {
                id:item._id,
                task: item.task,
                date: item.date,
                completed: item.completed,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }
        ]
    });
    return allitem;
};

export const deleteItem = async (id)=>
{
    const response = await fetch(`http://localhost:5000/api/todo/deleteItem/${id}`,
        {
            method: "DELETE",
        }
    );
    const data = await response.json();
    return data;
}

export const updateItem = async (id)=>
{
    const response = await fetch(`http://localhost:5000/api/todo/completedItem/${id}`,
        {
            method: "PUT",
        }
    );
    const data = await response.json();
    return mapServerItemToLocalItem([data]);
}