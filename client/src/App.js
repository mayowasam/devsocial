import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import './App.css';
import SignUp from './components/authForms/SignUp';
import Login from './components/authForms/Login';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './utils/ProtectedRoute';
// import ProfileForm from './components/profileForms/ProfileForm';
// import EditProfile from './components/profileForms/EditProfile';
import { checkUser } from './redux hook/actions/authCreator';
import { authHeader } from './utils/setAuthHeader';
import ProfileEdit from './components/profileForms/ProfileEdit';
import AddExperience from './components/profileForms/AddExperience';
import AddEducation from './components/profileForms/AddEducation';
import Profile from './components/profile/Profile';
import Profiles from './components/profile/Profiles';
import Posts from './components/post/Posts';
import Post from './components/post/Post';


if (localStorage.token) {
  authHeader(localStorage.token)

}


function App() {
  let dispatch = useDispatch()
  let auth = useSelector(state => state.auth.isAuthenticated)
  let loading = useSelector(state => state.auth.loading)
  //  console.log('auth app', auth);

  
  useEffect(() => {
    dispatch(checkUser())
  }, []);


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="dashboard" element={
            <ProtectedRoute auth={auth} loading={loading}>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="profile/:id" element={
            <ProtectedRoute  auth={auth} loading={loading}>
              <Profile />
            </ProtectedRoute>
          } />

          {/* <Route path="createprofile" element={
            <ProtectedRoute>
              <ProfileForm />
            </ProtectedRoute>
          } />

          <Route path="editprofile" element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          } /> */}

          <Route path="editprofile" element={
            <ProtectedRoute  auth={auth} loading={loading}>
              <ProfileEdit />
            </ProtectedRoute>
          } />

          <Route path="experience" element={
            <ProtectedRoute  auth={auth} loading={loading}>
              <AddExperience />
            </ProtectedRoute>
          } />

          <Route path="education" element={
            <ProtectedRoute  auth={auth} loading={loading}>
              <AddEducation />
            </ProtectedRoute>
          } />


          <Route path="posts" element={
            <ProtectedRoute  auth={auth} loading={loading}>
              <Posts />
            </ProtectedRoute>
          } />

          <Route path="post/:id" element={
            <ProtectedRoute  auth={auth} loading={loading}>
              <Post />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
