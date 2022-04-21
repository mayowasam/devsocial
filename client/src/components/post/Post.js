import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getPost, addComment, deletecomment } from '../../redux hook/actions/postCreator'

function Post() {
    const [formData, setFormData] = useState('')

    const { post:{avatar, name, text, comments} } = useSelector(state => state.post)
   

    let params = useParams()
    let { id } = params
    let dispatch = useDispatch()

    useEffect(() => {
        getPost(id, dispatch)
    }, [id, dispatch])

    const handleSubmit= (e)  => {
        e.preventDefault()
        addComment(formData, id,  dispatch)
        setFormData("")
    }

    const deleteComment = (comment) => {
        deletecomment(id, comment, dispatch)
    }
    return <section className="container">
        <Link to="/posts" className="btn">Back To Posts</Link>
         <div className="post bg-white p-1 my-1">
            <div>
                <a href="profile.html">
                    <img
                        className="round-img"
                        src={avatar && avatar}
                        alt=""
                    />
                    <h4>{name && name}</h4>
                </a>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
            </div>
        </div>
        

        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" onSubmit={handleSubmit}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Comment on this post"
                    value={formData}
                    onChange={e => setFormData(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>

        <div className="comments">
            {comments && comments.length > 0 && comments.sort((a,b) => new Date(a.date) - new Date(b.date)).map(comment => (
                <div className="post bg-white p-1 my-1" key={comment._id}>
                    <div>
                        <a href="profile.html">
                            <img
                                className="round-img"
                                src={comment.avatar}
                                alt=""
                            />
                            <h4>{comment.name}</h4>
                        </a>
                    </div>
                    <div>
                        <p className="my-1">
                            {comment.text}
                        </p>
                        <p className="post-date">
                            Posted on {new Date(comment.date).toLocaleString()}
                        </p>
                    </div>
                    {/* {user._id === post.user &&  */}
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteComment(comment._id)}
                        >
                            <i className="fas fa-times"></i>Delete
                        </button>
                         {/* } */}
                </div>
            ))}
        </div>

    </section >;
}

export default Post;
