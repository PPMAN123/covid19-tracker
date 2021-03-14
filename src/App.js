import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { useSummary, SummaryProvider } from './context/SummaryContext';
import { ReportProvider } from './context/ReportContext';
import HomePage from './pages/HomePage';
import { ProvinceProvider } from './context/ProvinceContext';
import ProvincePage from './pages/ProvincePage';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ProblemPage';

function App() {
  return (
    <Router>
      <SummaryProvider>
        <ReportProvider>
          <ProvinceProvider>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/provinces">
                <ProvincePage />
              </Route>
              <Route exact path="/about">
                <AboutPage />
              </Route>
              <Route>
                <ErrorPage />
              </Route>
            </Switch>
          </ProvinceProvider>
        </ReportProvider>
      </SummaryProvider>
    </Router>
  );
}

export default App;
