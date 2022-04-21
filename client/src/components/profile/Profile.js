import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getprofilebyid, getgithub } from '../../redux hook/actions/profileCreator'


function Profile() {

    const { profile, repos } = useSelector(state => state.profile)
    const { isAuthenticated } = useSelector(state => state.auth)


    let userName = profile && profile.githubusername
    // const { user } = useSelector(state => state.profile.profile)
    let dispatch = useDispatch()
    let param = useParams()
    let { id } = param
    // console.log(profile);
    // console.log(user);


    useEffect(() => {
        getprofilebyid(id, dispatch)
        getgithub(dispatch, userName)
    }, [id, dispatch, userName])

    return isAuthenticated ? <section className="container">
        <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>

        <div className="profile-grid my-1">

            {/* Top  */}
            <div className="profile-top bg-primary p-2">
                <img
                    className="round-img my-1"
                    src={profile && profile.user.avatar}
                    alt=""
                />
                <h1 className="large">{profile && profile.user.name}</h1>
                <p className="lead">{profile && profile.status} {profile && profile.company && `at ${profile.company}`}</p>
                <p>{profile && profile.location}</p>
                <div className="icons my-1">
                    {profile && profile.website &&
                        <a href={profile && profile.website} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-globe fa-2x"></i>
                        </a>
                    }
                    {profile &&  profile.social && profile.social.twitter &&
                        <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter fa-2x"></i>
                        </a>
                    }

                    {profile &&  profile.social && profile.social.facebook &&
                        <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                    }
                    {profile &&  profile.social && profile.social.linkedIn &&
                        <a href={profile.social.linkedIn} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin fa-2x"></i>
                        </a>
                    }
                    {profile && profile.social &&  profile.social.youtube &&
                        <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-youtube fa-2x"></i>
                        </a>
                    }
                    {profile && profile.social && profile.social.instagram &&
                        <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                    }


                </div>
            </div>

            {/* About */}
            <div className="profile-about bg-light p-2">
                <h2 className="text-primary">{profile ? `${(profile.user.name).trim().split(' ')[0]}'s Bio`: 'no Bio'}</h2>
                <p>
                    {profile && profile.bio}
                </p>
                <div className="line"></div>
                <h2 className="text-primary">Skill Set</h2>

                {profile && profile.skills.map((skill, index) =>
                    <div className="skills" key={index + 1}>
                        <div className="p-1"><i className="fa fa-check"></i> {skill}</div>

                    </div>
                )}
            </div>

            {/* Experience */}
            <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile && profile.experience.length > 0 ? profile.experience.map((experience) =>
                    <div key={experience._id}>
                        <h3 className="text-dark">{experience.company}</h3>
                        <p> {new Date(experience.from).toLocaleDateString()} -
                            {experience.to ? new Date(experience.to).toLocaleDateString() : 'Now'}</p>
                        <p><strong>Position: </strong>{experience.title}</p>
                        <p>
                            <strong>Description: </strong>{experience.description}
                        </p>
                    </div>
                ) : <h4> No experience </h4>}

            </div>

            {/* Education */}

            <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile && profile.education.length > 0 ? profile.education.map((education) =>
                    <div key={education._id}>
                        <h3>{education.school}</h3>
                        <p>{new Date(education.from).toLocaleDateString()} -
                            {education.to ? new Date(education.to).toLocaleDateString() : 'Now'}</p>
                        <p><strong>Degree: </strong>{education.degree}</p>
                        <p><strong>Field Of Study: </strong>{education.fieldofstudy}</p>
                        <p>
                            <strong>Description: </strong>{education.description}
                        </p>
                    </div>
                ) : <h4> No education </h4>}
            </div>

            {/* Github  */}
            <div className="profile-github">
                <h2 className="text-primary my-1">
                    <i className="fab fa-github"></i> Github Repos
                </h2>
                {repos ? repos.map(repo => (
                    <div className="repo bg-white p-1 my-1">


                        <div key={repo._id}>
                            <h4><a href={repo.html_url} target="_blank"
                                rel="noopener noreferrer">{repo.name}</a></h4>
                            <p>
                                {repo.description}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                                <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                                <li className="badge badge-light">Forks: {repo.forks_count}</li>
                            </ul>
                        </div>
                    </div>
                )): <h4> No Repos .....</h4>}
                
            </div>
        </div>
    </section>
        : <> <Navigate to="/login" /> </>
}

export default Profile;
