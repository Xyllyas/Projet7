import React from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
const DeletePost = ({element, token}) => {
    const config = {
        headers: {
            'Authorization':  `Bearer ${token}`
        }
    }

    function deletePost(){
        axios.delete(`http://localhost:3000/api/post/${element._id}`, config)
        .then(()=> window.location.reload(false))
        .catch(err=> console.log(err))
    }

    return (
        <div className='button delete'  onClick={deletePost}>
            <FontAwesomeIcon icon={faTrashCan} />
            <div>
                <button>Supprimer</button>
            </div>
        </div>
    );
};

export default DeletePost;