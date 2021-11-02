import './App.css';
import { ExampleComponent, DifferentComponent } from '../';
import { withRouter } from 'react-router-dom'
import Routes from '../router'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {

  return (
    <div>
      <Routes />
    </div>
  );
}

export default withRouter(App);
