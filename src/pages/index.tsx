import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { useTheme } from 'next-themes'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] })

// assets
import HeaderBgDark from '@/assets/bg-desktop-dark.jpg';
import HeaderBgLight from '@/assets/bg-desktop-light.jpg';

// component
import ToogleTheme from '@/components/toogleTheme';
import Footer from '@/components/footer';
import TodoList from '@/components/todo-list'

// services
import { 
  createTodo ,
  updateStatusTodo ,
  deleteItemTodo,
  deleteCompletedTodo
} from '@/services/todo';

export default function Home() {

  
  const { theme, setTheme } = useTheme()

  const bg = theme ==='dark' ? HeaderBgDark.src : HeaderBgLight.src 

  const [data, setData] = useState([]);
  const [dataActive, setDataActive] = useState([]);
  const [dataComplete, setDataComplete] = useState([]);
  const [tab ,setTab] = useState('all')
  const [inputValue, setInputValue] = useState(''); 
  const [loading ,setLoading] = useState(false);


  // Get Data
  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch('api/todo/list-todo');
      const result = await response.json();
      const completedData = result.data.filter((item:any) => item.completed === "complete");
      const activeData = result.data.filter((item:any) => item.completed === "not_complete");
      setData(result.data);
      setDataComplete(completedData);
      setDataActive(activeData);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  //Post Data
  const postTodo = async () => {
    await createTodo(getData,inputValue,setTab,setInputValue,setLoading);
  };

  //Update Todo Complete
  const updateTodoComplete = async (id:any) => {
    await updateStatusTodo(getData,id,setLoading);
  };

  //Delete Todo
  const deleteTodo = async(id:any) =>{
    await deleteItemTodo(getData,id,setLoading);
  }

  //Delete Complete Todo
  const deleteCompleteTodo = async() =>{
    await deleteCompletedTodo(getData,data,setLoading);
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <main>
      <ToastContainer theme={theme ==='dark' ? 'dark' : 'light'} />
      <div className="h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${bg})` }}>
        <div className="absolute inset-0 bg-primary/10"></div>
      </div>
      <div className="card-continer">
          <div className="flex items-center justify-between w-full z-50">
            <h1 className="text-white text-3xl font-bold">T O D O</h1>
            <ToogleTheme/>
          </div>

          <div className="mt-6">
            <div className="relative">
                <input 
                  type="text" 
                  className={`input`}
                  placeholder='Create a new todo..'
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                />
                <div className="absolute top-[0.1rem] right-0 px-[0.1rem]">
                  <button onClick={postTodo} className="addBtn">
                    ADD
                  </button>
                </div>
            </div>
            <div className="card-todo">
                {tab == 'all' ?
                  <TodoList 
                    tab={tab}
                    loading={loading}
                    data={data} 
                    updateTodoComplete={updateTodoComplete} 
                    deleteTodo={deleteTodo} 
                  />
                  :null
                }

                {tab == 'active' ?
                  <TodoList 
                    tab={tab}
                    loading={false}
                    data={dataActive} 
                    updateTodoComplete={updateTodoComplete} 
                    deleteTodo={deleteTodo} 
                  />
                  :null
                }

                {tab == 'complete' ?
                  <TodoList 
                    tab={tab}
                    loading={false}
                    data={dataComplete} 
                    updateTodoComplete={updateTodoComplete} 
                    deleteTodo={deleteTodo} 
                  />
                  :null
                }

                <Footer
                  coutItemsLeft={tab == 'all' ? data.length : tab == 'active' ? dataActive.length : dataComplete.length}
                  clearAllFunc={deleteCompleteTodo}
                  colorActive={tab}
                  allTabFunc={() => {
                      if(tab != 'all'){
                          setTab('all')
                      }
                  }}
                  activeTabFunc={() => {
                      if(tab != 'active'){
                          setTab('active')
                      }
                  }}
                  completeTabFunc={() => {
                      if(tab != 'complete'){
                          setTab('complete')
                      }
                  }}
                />
            </div>
          </div>
      </div>
    </main>
  )
}
