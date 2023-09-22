import React from 'react'
import IconCheck from '@/assets/icon-check.svg'
import IconEmpty from '@/assets/empty.svg'
import Image from 'next/image';

type TodoItem = {
    id: string;
    completed: 'complete' | 'not_complete';
    title: string;
};

type TodoListProps = {
    data: TodoItem[];
    tab :string;
    loading : boolean;
    updateTodoComplete: (id: string) => void;
    deleteTodo: (id: string) => void;
};

const TodoList: React.FC<TodoListProps> = ({ data, updateTodoComplete, deleteTodo,tab,loading }) => {
    return (
        <div className="h-72 overflow-y-auto divide-y dark:divide-gray-700 relative">

        {loading == true ?
            <div className="bg-white dark:bg-gray-800 absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative animate-spin">
                    <div className="rounded-full  w-7 h-7 flex items-center justify-center  bg-gradient-to-r from-checkBgFrom to-checkBgTo "></div>
                    <div className="bg-white backdrop-blur-lg  w-6 h-6 rounded-full dark:bg-gray-800 absolute top-[0.1rem] left-[0.1rem]  "></div>
                </div>
                <p className="dark:text-white text-xs mt-1 text-center pl-2">loading...</p>
            </div>
        :null}
        {data.length > 0 ?
            <>
            {data.map((item, index) => (
                <div className="p-4" key={index}>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                            <button 
                                onClick={() => updateTodoComplete(item.id)}
                                className="rounded-full border w-6 h-6 flex items-center justify-center dark:border-gray-700  hover:bg-gradient-to-r from-checkBgFrom to-checkBgTo">
                                {item.completed == 'not_complete' ?
                                    <div className="bg-white w-5 h-5 rounded-full dark:bg-gray-800"></div>
                                    :
                                    <Image
                                        src={IconCheck}
                                        alt='iconsun'
                                        className="bg-gradient-to-r from-checkBgFrom to-checkBgTo w-5 h-5 rounded-full p-1"
                                    />
                                }
                            </button>
                            <p className={`text-sm line-clamp-1 ${item.completed == 'not_complete' ? '' : 'line-through'}`}>{item.title}</p>
                        </div>
                        <button 
                            onClick={() => deleteTodo(item.id)}
                            className='flex items-center justify-center hover:bg-red-500 rounded-full w-6 h-6 text-sm hover:text-white'> 
                            X
                        </button>
                    </div>
                </div>
            ))}
            </>
        : 
        <div className="flex flex-col items-center justify-center h-[16rem] text-xs ">
            <Image
                src={IconEmpty}
                alt='iconEmpty'
                className="w-48 h-48"
            />
            <p className="-mt-4">
                Tasks {tab == 'all' ? 'all' : tab == 'active' ? 'active' : 'complete'} is empty!
            </p>
        </div>
        }
        </div>
    );
}

export default TodoList;


