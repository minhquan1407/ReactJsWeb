import Navbar from "components/Header";
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ProductFeature from './features/Product';
import CartFeature from './features/MiniCart';



function App() {
  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Route path="/products" component={ProductFeature}/>
        <Route path="/cart" component={CartFeature}/>
      </Switch>

    </div>
  );
}

export default App;
