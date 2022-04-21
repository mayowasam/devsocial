import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setAlert, removeAlert } from '../../redux hook/actions/alertCreator'
import Alerts from '../layout/Alerts'
import {signup} from '../../redux hook/actions/authCreator'


function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    let dispatch = useDispatch()
    let navigate = useNavigate()


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            dispatch(setAlert('password do not match', 'danger'))
            setTimeout(() => dispatch( removeAlert()), 2000);

           

        } else {
            signup(formData, dispatch)
        }

    }

    useEffect(() => {
        isAuthenticated && navigate('/dashboard')

    }, [isAuthenticated])

    return <section className="container">
        <Alerts />

        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" placeholder="Name" name="name" value={formData.name} onChange={(e) => handleChange(e)} required />
            </div>
            <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={(e) => handleChange(e)} />
                <small className="form-text"
                >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    // minLength="6"
                    value={formData.password} onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    // minLength="6"
                    value={formData.confirmPassword} onChange={(e) => handleChange(e)}

                />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
            Already have an account?
            <Link to='/login' >Login</Link>
        </p>
    </section>;

}

export default SignUp;
