import { useSelector } from 'react-redux';

function Alerts() {
  const alerts = useSelector(state => state.alert)
  // console.log(alerts);
  return alerts && alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    {alert.msg}
    </div>));
}

export default Alerts;
