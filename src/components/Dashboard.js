import React, { useEffect, useState } from 'react';
import {getToken,cleartoken} from '../helpers/token'


function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const getUser = async () => {
        const token = getToken();
        const response = await fetch(
            'http://localhost:8001/api/user',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        const jsonResponse = await response.json();
        if(!response.ok){
            cleartoken();
        }else{
            setUser(jsonResponse);
        }
    }

    const getApiData = async () => {
        const token = getToken();
        const response = await fetch(
            'http://localhost:8001/api/posts',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        const jsonResponse = await response.json();
        if(!response.ok){
            cleartoken();
        }else{
            setPosts(jsonResponse.data);
        }


    };

    useEffect(() => {
        getUser();
        getApiData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getToken();
        const formData = new FormData();
		formData.append('file', selectedFile);
        formData.append('fileName', selectedFile.name);
        const response = await fetch('http://localhost:8001/api/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        })
        if(!response.ok){
            setErrorMessage('Invalid File')
            setSuccessMessage("");
            if(response.status === 401){
                cleartoken();
            }
        }else{
            getApiData();
            setErrorMessage('')
            setSuccessMessage("Records Saved");
        }
    }

    const handleFileChange = e => {
        setSelectedFile(e.target.files[0])
    }

    const logoutClick = e => {
        cleartoken();
    }

    return (
        <div className='container'>
            <header className="blog-header py-3">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-4 pt-1">
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <a className="btn btn-sm btn-outline-secondary" onClick={logoutClick}>Logout</a>
                    </div>
                </div>
            </header>

            {user && (user.is_superuser || user.is_staff) && <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={handleFileChange}/>
                    <span>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <br></br>
                        <span>{errorMessage && (errorMessage)}</span>
                        <span>{successMessage && (successMessage)}</span>
                    </span>
                </div>
            </form>}

            <hr/>

            <table className="table table-sm">
                <tbody>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Body</th>
                    </tr>
                    {posts && posts.map((item, i) => (
                        <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.userId}</td>
                            <td>{item.title}</td>
                            <td>{item.body}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
