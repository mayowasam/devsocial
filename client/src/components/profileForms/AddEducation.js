import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addEducation } from '../../redux hook/actions/profileCreator'
import Alerts from '../layout/Alerts';

const initialState = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",

}
function AddEducation() {
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        //    console.log(formData);
        addEducation (formData, dispatch, navigate)

    }
    return <section className="container">
        <Alerts/>
        <h1 className="large text-primary">
            Add Your Education
        </h1>
        <p className="lead">
            <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
            you have attended
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="* School or Bootcamp"
                    name="school"
                    value={formData.school} 
                    required 
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="* Degree or Certificate"
                    name="degree"
                    value={formData.degree} 
                    required 
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="form-group">
                <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={formData.fieldofstudy} required onChange={(e) => handleChange(e)}/>
            </div>
            <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={formData.from} onChange={(e) => handleChange(e)}/>
            </div>
            <div className="form-group">
                <p>
                    <input type="checkbox" name="current" value={formData.current} onChange={(e) => handleChange(e)} /> Current School or Bootcamp
                </p>
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
                    placeholder="Program Description"
                    value={formData.description} required onChange={(e) => handleChange(e)}
                ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
        </form>
    </section>;
}

export default AddEducation;
