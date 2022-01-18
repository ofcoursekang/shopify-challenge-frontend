import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch}from'react-router-dom';
import ListItemsComponent from './components/ListItemsComponent';
import HeaderComponent from './components/HeaderComponent';
import CreateItemComponent from './components/CreateItemComponent';



function App() {
  return (

      <div>
        <Router>
          <HeaderComponent/>
                <div className="container">
                  <Switch> 
                      <Route path = '/' exact component={ListItemsComponent} />
                      <Route path = '/items' component={ListItemsComponent}/>
                      <Route path = '/add-items/:id' component={CreateItemComponent}/>

                  </Switch>
                </div>
        </Router>
      </div>

  );
}

export default App;
