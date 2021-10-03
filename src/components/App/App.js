import './App.css';
import { ExampleComponent, DifferentComponent } from '../';
import { withRouter } from 'react-router-dom'
import Routes from '../router'
import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';


function RenderDefault() {
  const history = useHistory()

  return (
    <div>
      Default bitch
      <Button onClick={() => history.push('/example')}>Button</Button>
    </div>
  )
}

function App({ location }) {
  console.log(location)

  return (
    <div>
     
      <Routes />


    </div>
  );
}

export default withRouter(App);
