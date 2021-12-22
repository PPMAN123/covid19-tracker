import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const SummaryContext = createContext({});

const defaultValue = {
  latest_date: null,
  change_cases: null,
  change_fatalities: null,
  change_tests: null,
  change_hospitalizations: null,
  change_criticals: null,
  change_recoveries: null,
  total_cases: null,
  total_fatalities: null,
  total_tests: null,
  total_hospitalizations: null,
  total_criticals: null,
  total_recoveries: null,
  loadingState: 'none',
};

const SummaryProvider = ({ children, value, ...rest }) => {
  const [summary, setSummary] = useState(value || defaultValue);

  useEffect(() => {
    const dataFetch = async () => {
      setSummary((prevSummary) => {
        const newSummary = Object.assign({}, prevSummary);
        newSummary.loadingState = 'loading';
        return newSummary;
      });
      const response = await axios.get(
        '/.netlify/functions/node-fetch/?endpoint=summary'
      );
      const { data } = response;
      if (data) {
        const [summaryData] = data.data;
        setTimeout(() => {
          setSummary((prevSummary) => {
            const newSummary = Object.assign({}, prevSummary, summaryData);
            newSummary.loadingState = 'complete';
            return newSummary;
          });
        }, 1);
      }
    };
    dataFetch();
  }, []);

  return (
    <SummaryContext.Provider
      value={{
        summary,
        setSummary,
      }}
      {...rest}
    >
      {children}
    </SummaryContext.Provider>
  );
};

const useSummary = () => {
  const { summary, setSummary } = useContext(SummaryContext);
  return { summary, setSummary };
};

export { SummaryProvider, useSummary };
