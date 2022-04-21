import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addExperience } from '../../redux hook/actions/profileCreator'
import Alerts from '../layout/Alerts';



const initialState = {
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",

}

function AddExperience() {
    const [disable, setDisable] =useState(false)
    const [formData, setFormData] = useState(initialState)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        if (e.target.type === 'checkbox') {
            setFormData({ ...formData, [e.target.name]: !formData.current });
            setDisable(!disable)
        }
    }

    // console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault()
        //    console.log(formData);
        addExperience(formData, dispatch, navigate)

    }

    return <section className="container">
        <Alerts />
        <h1 className="large text-primary">
            Add An Experience
        </h1>
        <p className="lead">
            <i className="fas fa-code-branch"></i> Add any developer/programming
            positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" placeholder="* Job Title" name="title" value={formData.title} required onChange={(e) => handleChange(e)} />
            </div>
            <div className="form-group">
                <input type="text" placeholder="* Company" name="company" value={formData.company} required onChange={(e) => handleChange(e)} />
            </div>
            <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={formData.location} onChange={(e) => handleChange(e)} />
            </div>
            <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={formData.from} onChange={(e) => handleChange(e)} />
            </div>
            <div className="form-group">
                <p><input type="checkbox" name="current" value={formData.current} onChange={(e) => handleChange(e)} /> Current Job</p>
            </div>
            <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={formData.to} onChange={(e) => handleChange(e)} disabled={disable} />
            </div>
            <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    onChange={(e) => handleChange(e)}
                ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
        </form>
    </section>;
}

export default AddExperience;
