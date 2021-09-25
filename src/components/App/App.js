import './App.css';
import { ExampleComponent, DifferentComponent } from '../';
import { withRouter } from 'react-router-dom'
import Routes from '../router'
import { useHistory } from 'react-router-dom'


function RenderDefault() {
  const history = useHistory()

  return (
    <div>
      Default bitch
      <button onClick={() => history.push('/different')}>Button</button>
    </div>
  )
}

function App({ location }) {
  console.log(location)

  return (
    <div>
      <RenderDefault />
      <Routes />


    </div>
  );
}

export default withRouter(App);
