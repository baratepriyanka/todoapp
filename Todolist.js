
import React, { useState, useEffect, useRef } from 'react';
import { FaPencilAlt, FaTrash, FaCheckCircle } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import Axios from "axios";

const Todolist = () => {
    // console.log(localStorage.getItem('user'))
    const [todoListData, settodoListData] = useState([]);
    const [EditData, setEditData] = useState({
        todoname: ''
    })
    const getAllData = async () => {
        const response = await fetch(
            `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/todo/todos`
        );
        const data = await response.json();
        settodoListData(data);
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [deleteId, setDeleteId] = useState();

    const funcDelete = (id) => {
        setShow(true);
        setDeleteId(id);
    };
    const deleteOpdRow = (e) => {
        const id = e.target.value;
        console.log(id)
        Axios
            .post(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/todo/todos/${id}`) // <-- remove ;
            .then((res) => {
                const users = res.message;
                getAllData();
                setShow(false);
            });
    };

    useEffect(() => {

        getAllData();
    }, []);

    const [id, setId] = useState('');

    useEffect(() => {
        const funcEdit = async (id) => {
            // console.log(id)
            setEditShow(true);
            const response = await Axios.get(
                `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/todo/${id}`
            );
            setEditData(response.data);
            console.log(EditData);
        };

        if (id) {
            funcEdit(id);
        }
    }, [id]);

    const [editShow, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setEditData({ ...EditData, todoname: value });
    }
    const handleSubClose = (e) => {
        e.preventDefault();
        const id = EditData._id
        const todoname = EditData.todoname
        Axios.post(
            `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/todo/updatetodo/${id}`,
            EditData
        )
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <section>
                <div className='container mt-1'>
                    <div className="row justify-content-center">
                        <div className="col-md-6 ">
                            <div className="card card-class mb-1">
                                <div className='m-3'>
                                    <h3>The Todos;</h3>
                                    <button className="btn btn-primary addbtn" type="submit">
                                        <Link to='/post'>
                                            Add Todo
                                        </Link>
                                    </button>

                                </div>
                                {todoListData.map((curElm) => {
                                    // console.log(curElm._id)
                                    return (
                                        <div className='card mt-1 mb-3'>
                                            <div className="card-content">
                                                <div className="card-body">
                                                    <div className="media row" key={curElm._id}>
                                                        <div className="col-md-9 m-1 form-group">
                                                            <h5>Todo Name: {curElm.todoname} </h5>
                                                            <h5>Author : {curElm.author} </h5>
                                                            <h5>Description : {curElm.description} </h5>

                                                        </div>
                                                        <div className="col-md-2 m-1" style={{'display':'grid' }}>
                                                            <button
                                                                className="button-class"
                                                                type="button"
                                                                value={curElm._id} >
                                                                <FaCheckCircle className="icon-color" />
                                                            </button>
                                                            <Link
                                                                className="button-class"
                                                                type="button"
                                                                value={curElm._id}
                                                                to={`/editform/${curElm._id}`}
                                                                // onClick={() => setId(curElm._id)}
                                                            >
                                                                <FaPencilAlt className="icon-color1" />
                                                            </Link>

                                                            <button className="button-class" type="button" value={curElm._id} onClick={() => funcDelete(curElm._id)}><FaTrash className='icon-color2' /></button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>

                            <Modal show={show}  >
                                <Modal.Header >
                                    <Modal.Title>Delete Todo List</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>  Are you sure you want to Delete list</Modal.Body>
                                <Modal.Footer>
                                    <button type='btn' className='btn btn-primary' onClick={deleteOpdRow} value={deleteId}>
                                        Ok
                                    </button>
                                    <button type='btn' className='btn btn-secondary' onClick={handleClose}>
                                        Cancel
                                    </button>
                                </Modal.Footer>
                            </Modal>

                            <Modal show={editShow}>
                                <Modal.Header>
                                    <Modal.Title>Update Todo List</Modal.Title>
                                </Modal.Header>
                                <div className="row">
                                    <div className="col-md-9 m-1 form-group">

                                        <input type="text" name="todoname" onChange={(e) => handleChange(e)}
                                            value={EditData.todoname}
                                            required="" className="form-control" id="todoform" placeholder="enter ToDo" />


                                    </div>
                                </div>
                                <Modal.Footer>
                                    <button type="button" className="btn btn-primary" onClick={handleSubClose}>
                                        Ok
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={handleEditClose}>
                                        Cancel
                                    </button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Todolist;