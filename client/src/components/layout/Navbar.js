import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux hook/actions/authCreator'
import {clearprofile} from '../../redux hook/actions/profileCreator'

function Navbar() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const logOut = () => {
        dispatch(logout())
        dispatch(clearprofile())
        navigate("/")
    }

    const authLink = (
        <ul>
            <li>
                <Link to="/profiles">
                   Developers
                </Link>

            </li>
            <li>
                <Link to="/posts">
                   Posts
                </Link>

            </li>
            <li>
                <Link to="/dashboard"><i className="fas fa-user"></i>{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>

            </li>
            <li> <a href='#!' onClick={logOut}><i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Logout</span></a></li>
        </ul>
    )

    const guest = (
        <ul>
            <li> <Link to='/profiles'>Developers</Link></li>
            <li> <Link to='/signup'>SignUp</Link></li>
            <li> <Link to='/login'>Login</Link></li>
        </ul>
    )

    return <header>
        <nav className="navbar bg-dark">
            <h1>
                <Link to={!isAuthenticated && '/' }><i className="fas fa-code"></i> DevConnector</Link>
            </h1>

            {isAuthenticated ? authLink : guest}



        </nav>
    </header>;
}

export default Navbar;
