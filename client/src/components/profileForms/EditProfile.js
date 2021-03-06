import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createprofile } from '../../redux hook/actions/profileCreator';
import Alerts from '../layout/Alerts';


const initialState = {
    company: "",
    website: "",
    location: "",
    bio: "",
    status: "",
    githubusername: "",
    skills: "",
    youtube: "",
    twitter: "",
    linkedIn: "",
    instagram: "",
    facebook: ""
}
function EditProfile() {
    const profile = useSelector(state => state.profile.profile)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [formData, setFormData] = useState(initialState)

    useEffect(() => {
        if (profile) {
            let newProfile = {...profile, skills: profile.skills.join(',')}
            setFormData(
                newProfile
            )
        }

    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        createprofile(formData, dispatch, true, navigate)

    }

    return <section className="container">
        <Alerts />
        <h1 className="large text-primary">
            Edit Your Profile
        </h1>
        <p className="lead">
            <i className="fas fa-user"></i> Let's get some information to make your
            profile stand out
        </p>
        <small>* required field</small>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <select name="status" value={formData.status} onChange={(e) => handleChange(e)}>
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text">Give us an idea of where you are at in your career</small>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Company" name="company" value={formData.company} onChange={(e) => handleChange(e)} />
                <small className="form-text">Could be your own company or one you work for</small>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Website" name="website" value={formData.website} onChange={(e) => handleChange(e)} />
                <small className="form-text">Could be your own or a company website</small>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={formData.location} onChange={(e) => handleChange(e)} />
                <small className="form-text">City & state suggested (eg. Boston, MA)</small>
            </div>
            <div className="form-group">

                <input type="text" placeholder="* Skills" name="skills" value={formData.skills} onChange={(e) => handleChange(e)} />


                <small className="form-text">Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)</small>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Github Username"
                    name="githubusername"
                    value={formData.githubusername}
                    onChange={(e) => handleChange(e)}
                />
                <small className="form-text">If you want your latest repos and a Github link, include your
                    username</small>
            </div>
            <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio" value={formData.bio} onChange={(e) => handleChange(e)}></textarea>
                <small className="form-text">Tell us a little about yourself</small>
            </div>

            <div className="my-2">
                <button type="button" className="btn btn-light">
                    Add Social Network Links
                </button>
                <span>Optional</span>
            </div>

            <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" value={formData.twitter} name="twitter" onChange={(e) => handleChange(e)} />
            </div>

            <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" value={formData.facebook} onChange={(e) => handleChange(e)} />
            </div>

            <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" name="youtube" value={formData.youtube} onChange={(e) => handleChange(e)} />
            </div>

            <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedIn" value={formData.linkedIn} onChange={(e) => handleChange(e)} />
            </div>

            <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" name="instagram" value={formData.instagram} onChange={(e) => handleChange(e)} />
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
    </section>;
}

export default EditProfile;
