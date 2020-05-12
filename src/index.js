import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import Showcategory from './components/Showcategory';
import Createcategory from './components/Createcategory';
import Showpostcat from './components/Showpostcat';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Firebase, { FirebaseContext } from './components/Firebase';
import Appcss from './App.css'
import * as serviceWorker from './serviceWorker';

import Passwordchange from './components/Passwordchange';

ReactDOM.render(
        
         <FirebaseContext.Provider value={new Firebase()}>

                <Router>
                    <div>
                        <Route exact path='/' component={App} />
                        <Route path='/edit/:id' component={Edit} />
                        <Route path='/create' component={Create} />
                        <Route path='/show/:id' component={Show} />
                        <Route path='/showcategory' component={Showcategory} />
                        <Route path='/showpostcat/:id' component={Showpostcat} />
                        <Route path='/createcategory' component={Createcategory} />
                        <Route path='/Signup' component={Signup} />
                        <Route path='/Login' component={Login} />
                        <Route path='/Logout' component={Logout} />
                        <Route path='/Passwordchange' component={Passwordchange} />
                    </div>
                </Router>
        </FirebaseContext.Provider>,

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//registerServiceWorker();
serviceWorker.unregister();

