import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'
import { useSummary, SummaryProvider } from './context/SummaryContext'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <SummaryProvider>
        <Switch>
          <Route
            exact
            path="/"
          >
            <HomePage/>
          </Route>
        </Switch>
      </SummaryProvider>
    </Router>
  );
}

export default App;
