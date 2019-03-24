import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Signin from './modules/Auth/Signin';
import Signup from './modules/Auth/Signup';
import Shops from './modules/App/Shops';
import Admin from './modules/Admin/Admin';
import Billing from './modules/Billing/Billing';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTachometerAlt,
  faCogs,
  faChartBar,
  faChevronRight,
  faPlus,
  faSearch,
  faSave,
  faTimes,
  faPencilAlt,
  faTrash,
  faFile
} from '@fortawesome/free-solid-svg-icons';
import './App.scss';

library.add(
  faTachometerAlt,
  faCogs,
  faChartBar,
  faChevronRight,
  faPlus,
  faSearch,
  faSave,
  faTimes,
  faPencilAlt,
  faTrash,
  faFile
);

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/signin" component={ () => <Signin authRedirectPath='/' /> } />
        <Route path="/signup" component={ () => <Signup authRedirectPath='/' /> } />
        <Route path="/admin" component={ Admin } />
        <Route path="/billing" component={ Billing } />
        <Route path="/" component={ Shops } />
      </Switch>
    );
  }
}

export default App;
