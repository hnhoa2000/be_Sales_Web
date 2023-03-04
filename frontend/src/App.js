import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import News from './components/News';
import Contact from './components/Contact';
import Signup from './components/account/Signup';
import Signin from './components/account/Signin';
import Profile from './components/Profile';
import BanHang from './components/BanHang/BanHang';
import ListProduct from './components/BanHang/ListProduct';
import ThemSanPham from './components/BanHang/ThemSanPham';
import SuaSanPham from './components/BanHang/SuaSanPham';
import Detail from './components/Detail.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/:categoryName' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/News' element={<News />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Signin' element={<Signin />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/BanHang' element={<BanHang />} />
        <Route path='/detail/:idProduct' element={<Detail />} />
        <Route path='/BanHang/all' element={<ListProduct />} />
        <Route path='/BanHang/add' element={<ThemSanPham />} />
        <Route path='/BanHang/product/update/:id' element={<SuaSanPham />} />
      </Routes>
    </div>
  );
}

export default App;
