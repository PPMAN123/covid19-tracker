import {
    useContext,
    createContext,
    useState,
    useEffect
}
from 'react'
import axios from 'axios'

const SummaryContext = createContext({});

const defaultValue = {
    "latest_date": "2020-04-13",
    "change_cases": null,
    "change_fatalities": null,
    "change_tests": "6464",
    "change_hospitalizations": "23",
    "change_criticals": "2",
    "change_recoveries": "240",
    "total_cases": "0",
    "total_fatalities": "417",
    "total_tests": "433650",
    "total_hospitalizations": "1801",
    "total_criticals": "571",
    "total_recoveries": "7412"
}

const SummaryProvider = ({ children, value, ...rest }) => {
    const [summary, setSummary] = useState(value || defaultValue)

    useEffect(async () => {
        const response = await axios.get('/.netlify/functions/node-fetch')
        const { data } = response
        if(data){
            const [summaryData] = data.data;
            setSummary(summaryData);
        }
    }, [])

    return (
        <SummaryContext.Provider
            value={{
                summary,
                setSummary
            }}
            {...rest}
        >
            { children }
        </SummaryContext.Provider>
    )
}

const useSummary = () =>{
    const { summary, setSummary } = useContext(SummaryContext);
    return { summary, setSummary };
}

export{
    SummaryProvider,
    useSummary
}