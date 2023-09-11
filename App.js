import './App.css';
import Header from './Header';
import TodoForm from './component/TodoForm';
import EditTodoForm from './component/EditTodoForm';
import Login from './component/Login';
import Signup from './component/Signup';
import Todolist from './component/Todolist';
import Todoedit from './Todoedit'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
          <Header />
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/post" element={<TodoForm />} />
          <Route path="/editform/:id"  element={<EditTodoForm />} />
          <Route path="/postp" element={<Todolist />} />

        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
