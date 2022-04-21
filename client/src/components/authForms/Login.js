import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Alerts from '../layout/Alerts'
import { login } from '../../redux hook/actions/authCreator'


function Login() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        login(formData, dispatch)

    }
    useEffect(() => {
        isAuthenticated && navigate('/dashboard')

    }, [isAuthenticated])


    return <section className="container">
        <Alerts />
        <h1 className="large text-primary">Sign In </h1>


        <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange(e)}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
            Don't have an account?
            <Link to='/signup'>Sign Up</Link>
        </p>
    </section>;
}

export default Login;
