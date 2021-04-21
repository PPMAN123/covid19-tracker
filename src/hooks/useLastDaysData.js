import { useReport } from '../context/ReportContext';

const useLastDaysData = (range) => {
  const { report } = useReport();
  return report.dataPoints.slice(-range - 1);
};

export default useLastDaysData;
