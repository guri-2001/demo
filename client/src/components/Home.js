// frontend/src/components/ImageUpload.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    // console.log(id);

    const [image, setImage] = useState(null);
    const [imageUpdateImage, setUpdateImage] = useState(null);
    // const [imageId, setImageId] = useState(null);
    const [data, setData] = useState([]);
    const [imageById, setImageById] = useState([]);


    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImage = (e) => {
        setUpdateImage(e.target.files[0]);
    };

    const handleUpload = async (id) => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5000/api/images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUpdateImage(response.data.imageId);
            console.log(response.data);
            // setData(response.data.image.imageUrl);
            alert('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleUpdate = async (id) => {
        console.log(id);

        const formData = new FormData();
        formData.append('image', imageUpdateImage);

        try {
            await axios.put(`http://localhost:5000/api/images/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Image updated successfully');
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/images');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, []);

    const hanleShow = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/images/${id}`);
            setImageById(response.data.imageUrl);
            // console.log(response.data);

        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload Image</button>

            {/* {data && <img src={data} alt="Uploaded" style={{ width: '200px', marginTop: '20px' }} />} */}

            <div>

            </div>
            {data.map((image) => (
                <div key={image._id} style={{ margin: '10px', width: '200px' }}>
                    <img src={`http://localhost:5000${image.imageUrl}`} alt="Uploaded" style={{ width: '200px' }}
                        data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => hanleShow(image._id)} />
                        {/* <button onClick={() => handleUpdate(image._id)}>Update Image</button> */}
                    <div style={{ marginTop: "20px" }}>
                        <input type="file" onChange={handleImage} />
                        <button onClick={() => handleUpdate(image._id)}>Update Image</button>
                    </div>

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body" style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                    <img src={`http://localhost:5000${imageById}`} alt="Uploaded" style={{ width: '400px' }}
                                    />
                                    <div style={{ marginTop: "20px" }}>
                                        {/* <input type="file" onChange={handleImage} /> */}
                                        <button onClick={() => handleUpdate(image._id)}>Update Image</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImageUpload;
