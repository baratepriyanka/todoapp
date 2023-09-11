import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";

const TodoForm = () => {
    const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/todo/todos`;

    const initialvalue = {
        todoname: '',
        author: '',
        description: ''
    }
    const [formValues, setFormValues] = useState(initialvalue);
    const handleChange = function (e) {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

    }
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.todoname === "") {
            toast.error("please enter the todo name");

        } else if (formValues.author === "") {
            toast.error("please enter the author");

        } else if (formValues.description === "") {
            toast.error("please enter the description");

        } else {
            Axios.post(url, {
                todoname: formValues.todoname,
                author: formValues.author,
                description: formValues.description
            }, { headers: { "Access-Control-Allow-Origin": "*" } }).then((res) => {
                toast.success("added data");
                navigate('/postp')
            }).catch((error) => {
                console.log(error);
                alert("you have entered incorrect value");
            })

        }
    };



    return (
        <>
            <section>
                <div className='container mt-1'>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card card-class">
                                <div className="card-content">
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row justify-content-center">
                                                <div className="col-md-9 m-1 form-group">

                                                    <input type="text" name="todoname" value={formValues.todoname}
                                                        onChange={handleChange}
                                                        required="" className="form-control" id="todoform" placeholder="enter todo name" />
                                                    <br />
                                                    <input type="text" name="author" value={formValues.author}
                                                        onChange={handleChange}
                                                        required="" className="form-control" id="todoform" placeholder="enter author" />
                                                    <br />
                                                    <input type="text" name="description" value={formValues.description}
                                                        onChange={handleChange}
                                                        required="" className="form-control" id="todoform" placeholder="enter description" />
                                                </div>

                                            </div>
                                            <div className='row justify-content-center m-2'>
                                            <div className="col-md-2 text-center">
                                               
                                                <button className="btn navbar-end" type="submit">
                                                    Save
                                                </button>
                                               
                                            </div>
                                            <div className="col-md-2 text-center">
                                              
                                                <button className="btn navbar-end" type="submit">
                                                    Cancel
                                                </button>
                                               
                                            </div>
                                            </div>
                                        </form>
                                        <ToastContainer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}
export default TodoForm;