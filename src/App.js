import './App.css';
import Home from './pages/Home';
import Detail from './pages/Detail';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/footer/Footer';

function App({props}) {
  return (
    <Router>
      <Navbar props={props}></Navbar>
      <Switch>
        <Route exact path='/' render={(props)=>(<Home ></Home>)}></Route>
        <Route exact path='/detail/:idx' render={(props)=>(<Detail props={props}></Detail>)}></Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
