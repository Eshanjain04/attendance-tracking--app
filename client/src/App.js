import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import AddSubject from './components/AddSubject';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/subject/add' element={<AddSubject/>}/>
        <Route path='/*' element={<div>No such Page Found</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
