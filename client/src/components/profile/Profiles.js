import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getallprofile,  getprofile } from '../../redux hook/actions/profileCreator'


function Profiles() {
    const {  profiles } = useSelector(state => state.profile)
    // console.log(profiles);
    let dispatch = useDispatch()

    useEffect(() => {
        getallprofile(dispatch)
        getprofile(dispatch)
    }, [dispatch])

    return <section className="container">
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with developers
        </p>
        <div className="profiles">
            {profiles ? profiles.map(profile => (
                <div className="profile bg-light" key={profile.user._id}>
                    <img
                        className="round-img"
                        src={profile.user.avatar}
                        alt=""
                    />
                    <div>
                        <h2>{profile.user.name}</h2>
                        <p>{profile.status}</p>
                        <p>{profile.location}</p>
                        <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">View Profile</Link>
                    </div>

                    <ul>
                        {profile.skills.slice(0,5).map((skill,index) => (
                            <li className="text-primary" key={index}>
                                <i className="fas fa-check"></i> {skill}
                            </li>
                        ))}


                    </ul>
                </div>
            )): 
            <h4>No profiles Found .......</h4>}

        </div>
    </section>;
}

export default Profiles;
