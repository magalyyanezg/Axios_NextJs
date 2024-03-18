'use client';
import React, { useState, useEffect } from "react";
import axios from 'axios';

const CRUD = () => {
    const [formData, setFormData] = useState({
        userId: "",
        id: "",
        title: "",
        body: "",
    });

    const [editID, setEditID] = useState();
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    const { userId, id, title, body } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId && id && title && body) {
            axios.post('https://jsonplaceholder.typicode.com/posts', formData)
                .then(res => {
                    setData([...data, res.data]);
                    setFormData({ userId: "", id: "", title: "", body: "" });
                    setError("");
                })
                .catch(err => console.log(err));
        } else {
            setError("Por favor, completa todos los campos.");
        }
    };

    const handleUpdate = () => {
        if (userId && id && title && body) {
            axios.put(`https://jsonplaceholder.typicode.com/posts/${editID}`, formData)
                .then(res => {
                    setFormData({ userId: "", id: "", title: "", body: "" });
                    setError(""); 
                })
                .catch(err => console.log(err));
        } else {
            setError("Por favor, completa todos los campos."); 
        }
    };

    const handleDelete = (deleteID) => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${deleteID}`)
            .then(res => {
                console.log('DELETED RECORD::::', res);
                setData(data.filter(item => item.id !== deleteID));
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (editIDNotState) => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${editIDNotState}`)
            .then(res => {
                setFormData(res.data);
                setEditID(res.data.id);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 mt-2">
                    <h4> Crud usando Axios</h4>
                    {error && <div className="alert alert-danger" style={{ color: "red" }}>{error}</div>} 
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="userId">Id </label>
                            <input
                                type="text"
                                className="form-control"
                                id="userId"
                                placeholder="Enter user id"
                                name="userId"
                                value={userId}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="id">Id de usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                id="id"
                                placeholder="Enter id"
                                name="id"
                                value={id}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Enter title"
                                name="title"
                                value={title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="body">Mensaje</label>
                            <textarea
                                className="form-control"
                                id="body"
                                rows="3"
                                placeholder="Enter body"
                                name="body"
                                value={body}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Agregar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                            Actualizar
                        </button>
                    </form>

                    <hr />

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Id de usuario</th>
                                <th>Titulo</th>
                                <th>Mensaje</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.userId}</td>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => handleEdit(item.id)}>
                                            Editar
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CRUD;
