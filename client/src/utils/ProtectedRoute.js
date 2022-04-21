import { Navigate } from 'react-router-dom';



function ProtectedRoute({ children,auth, loading}) {
 
  
  // localStorage.setItem("auth", auth)
  // console.log('auth', auth);
  
  


  return (auth  && !loading ) ? children : <Navigate to="/login" />
}

export default ProtectedRoute;
