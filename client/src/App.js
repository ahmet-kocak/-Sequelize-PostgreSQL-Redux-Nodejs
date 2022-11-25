import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes,Route } from 'react-router-dom';
import Page404 from './helpers/Page404';
import AddForm from './component/Form';
import List from './component/List';
import Home from './component/Home';


function App() {
  return (
    <div className="App">
  <Routes>
    <Route path='/'   element={<Home/>}/>
    <Route path="form" element={<AddForm/>} />
    <Route path="list" element={<List/>} />
    <Route path='/*' element={<Page404/>} />
  </Routes>
    </div>
  );
}

export default App;
