import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts, likePost, deletepost, addPost } from '../../redux hook/actions/postCreator'
import Alerts from '../layout/Alerts'
import { BiLike } from 'react-icons/bi'
import {RiDeleteBin6Fill} from 'react-icons/ri'

function Posts() {
    const { posts } = useSelector(state => state.post)
    const { user } = useSelector(state => state.auth)
    const [formData, setFormData] = useState('')
    // console.log(posts);

    let dispatch = useDispatch()

    useEffect(() => {
        setInterval(() => {
            getPosts(dispatch)

        }, 3000)
    }, [dispatch])



    const handleSubmit = (e) => {
        e.preventDefault()
        addPost(formData, dispatch)
        setFormData("")
    }

    return <section className="container">
        <Alerts />
        <h1 className="large text-primary">
            Posts
        </h1>
        <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={handleSubmit}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={formData}
                    onChange={e => setFormData(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>

        <div className="posts">
            {(posts && posts.length > 0) ? posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(post => (

                <div className="post bg-white p-1 my-1" key={post._id}>
                    <div>
                        <a href="/post">
                            <img
                                className="round-img"
                                src={post.avatar}
                                alt=""
                            />
                            <h4>{post.name}</h4>
                        </a>
                    </div>
                    <div>
                        <p className="my-1">
                            {post.text}
                        </p>
                        <p className="post-date">
                            Posted on {new Date(post.createdAt).toLocaleString()}
                        </p>

                        <button type="button" className="btn btn-light" onClick={(e) => likePost(post._id, dispatch)}>
                            <BiLike />
                            {post.likes.length > 0 &&
                                <span>{post.likes.length}</span>
                            }
                        </button>

                        <Link to={`/post/${post._id}`} className="btn btn-primary">
                            Discussion <span className='comment-count'>{post.comments.length}</span>
                        </Link>
                        {user._id === post.user &&
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={(e) => deletepost(post._id, dispatch)}
                            >
                                <RiDeleteBin6Fill/>
                            </button>
                        }
                    </div>
                </div>
            ))
                :
                <h4>No post found .......</h4>}
        </div>
    </section>;
}

export default Posts;
