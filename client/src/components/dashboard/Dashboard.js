import { useEffect } from 'react';
import { getprofile } from '../../redux hook/actions/profileCreator'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Alerts from '../layout/Alerts';
import {deleteexperience, deleteeducation, deleteaccount} from '../../redux hook/actions/profileCreator'

function Dashboard() {
    let profile = useSelector(state => state.profile.profile)
    let user = useSelector(state => state.auth.user)
    // console.log(profile);
    // console.log(user);
    let dispatch = useDispatch()
    let navigate = useNavigate()

    useEffect(() => {
        getprofile(dispatch)
    }, [dispatch])

    const deleteExperience = (id) => {
        deleteexperience(id, dispatch, navigate)
    }

    const deleteEducation = (id) => {
        deleteeducation(id, dispatch, navigate)

    }


    return profile ? <section className="container">
        <Alerts />
        <h1 className="large text-primary">
            Dashboard
        </h1>
        <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
        <div className="dash-buttons">
            <Link to="/editprofile" className="btn btn-light">
                {/* <i className="fas fa-user-circle text-primary"></i> Edit Profile */}
                <i className="fas fa-user-circle text-primary"></i>  {profile ? 'Edit Profile' : 'Create Profile'}
            </Link>

            <Link to="/experience" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i> Add Experience</Link>

            <Link to="/education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
        </div>

        <h2 className="my-2">Experience Credentials</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Years</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {profile && profile.experience.map((exp) => (


                    <tr key={exp._id}>
                        <td>{exp.company}</td>
                        <td className="hide-sm">{exp.title}</td>
                        <td className="hide-sm">

                            {new Date(exp.from).toLocaleDateString()} - 
                            {exp.to ? new Date(exp.to).toLocaleDateString() : 'Now'}
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={(e) =>deleteExperience(exp._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>

        <h2 className="my-2">Education Credentials</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>School</th>
                    <th className="hide-sm">Degree</th>
                    <th className="hide-sm">Years</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {profile && profile.education.map((ed) => (


                    <tr key={ed._id}>
                        <td>{ed.school}</td>
                        <td className="hide-sm">{ed.degree}</td>
                        <td className="hide-sm">
                            {new Date(ed.from).toLocaleDateString()} -
                            {ed.to ? new Date(ed.to).toLocaleDateString() : 'Now'}
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() =>deleteEducation(ed._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>

        <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteaccount(dispatch, navigate)}>
                <i className="fas fa-user-minus"></i>

                Delete My Account
            </button>
        </div>
    </section>

        :
        <>
            <section className="container">
                <h1 className="large text-primary">
                    Dashboard
                </h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
                <p>You do not have a profile, please add some info</p>
                {/* <Link to="/createprofile" className="btn btn-primary my-1">Create Profile </Link> */}
                <Link to="/editprofile" className="btn btn-primary my-1">Create Profile </Link>
            </section>
        </>
}

export default Dashboard;
