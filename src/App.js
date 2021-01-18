import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'
import { useSummary, SummaryProvider } from './context/SummaryContext'
import { ReportProvider } from './context/ReportContext'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <SummaryProvider>
        <ReportProvider>
          <Switch>
            <Route
              exact
              path="/"
            >
              <HomePage/>
            </Route>
          </Switch>
        </ReportProvider>
      </SummaryProvider>
    </Router>
  );
}

export default App;
