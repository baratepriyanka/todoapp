import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";

const EditTodoForm = () => {
    const { id } = useParams();
    const [formEdit, setformEEdit] = useState({ todoname:'',author:'',description:''})
    useEffect(() => {
        async function getformEEdit() {
          try {
            const response = await Axios.get(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/todo/getone/${id}`);
          
            setformEEdit(response.data);
          } catch (error) {
            console.log('Something is Wrong');
          }
        }
        getformEEdit();
     
      }, [id]);
    const handleChange = function (e) {
        setformEEdit({ ...formEdit,  [e.target.name]: e.target.value, });

    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           await Axios.post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/todo/updatetodo/${id}`, formEdit).then((response) => {

      
              console.log(response);
           })
          } catch (error) {
           console.log("Something is Wrong");
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

                                                    <input type="text" name="todoname" value={formEdit.todoname}
                                                        onChange={handleChange}
                                                        required="" className="form-control" id="todoform" placeholder="enter todo name" />
                                                    <br />
                                                    <input type="text" name="author" value={formEdit.author}
                                                        onChange={handleChange}
                                                        required="" className="form-control" id="todoform" placeholder="enter author" />
                                                    <br />
                                                    <input type="text" name="description" value={formEdit.description}
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
export default EditTodoForm;