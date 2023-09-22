
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// create Todo
export const createTodo =  async (
        getData: () => void,
        inputValue: string, 
        setTab: React.Dispatch<React.SetStateAction<string>>, 
        setInputValue: React.Dispatch<React.SetStateAction<string>>,
        setloading : React.Dispatch<React.SetStateAction<boolean>>
    ) => {

    interface PostData {
        title: string;
        completed: string;
    }
    const data: PostData = {
        title: inputValue,
        completed: 'not_complete',
    };
    try {
        setloading(true)
        const response = await fetch('api/todo/create-todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if(result.error){
            toast.error(result.error);
        } else {
            toast.success(result.data);
        }
        setInputValue('')
        setTab('all')
        getData();
        setloading(false)
    } catch (e) {
        console.log(e);
    }
};


export const updateStatusTodo =  async (
    getData: () => void,
    id:string,
    setloading : React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        setloading(true)
        const response = await fetch('api/todo/update-statusTodo', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        getData();
        setloading(false)
    } catch (e) {
        console.log(e);
    }
}

export const deleteItemTodo =  async (
    getData: () => void,
    id:string,
    setloading : React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        setloading(true)
        const response = await fetch(`api/todo/delete-todo`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        getData();
        setloading(false)
    } catch (e) {
        console.log(e);
    }
}

export const deleteCompletedTodo =  async (
    getData: () => void,
    data:never[],
    setloading : React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        setloading(true)
        const response = await fetch(`api/todo/delete-completeTodo`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        getData();
        setloading(false)
    } catch (e) {
        console.log(e);
    }
}
