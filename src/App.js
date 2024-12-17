import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import AddTask from './Pages/AddTask';
import ViewTask from './Pages/ViewTask';
import { Toaster } from 'react-hot-toast';
import DeleteTask from './Pages/DeleteTask';


function App() {
  return (
    <>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <div className='links'>
        <div className='one'>
          <button><NavLink to='add'>Add Task</NavLink></button>
        </div>
        <div className='two'>
          <button><NavLink to='view'>View Task</NavLink></button>
        </div>
      </div>

      <div className='container'>
        <Outlet />
      </div>

      <Routes>
        <Route path='/add' Component={AddTask} />
        <Route path='/view' Component={ViewTask} />
        <Route path='/updateTask/:id' Component={AddTask}/>
        <Route path='/deleteTask/:id' Component={DeleteTask}/>
      </Routes>
    </>
  );
}

export default App;
