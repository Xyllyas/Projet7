import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const DeleteComment = ({ element, comment, token }) => {

    function deleteComment() {
        console.log(token);
        fetch(`http://localhost:3000/api/comment/${element._id}/${comment.commentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            method: "DELETE"
        }).then(() => window.location.reload(false))
            .catch(err => console.log(err))
    }

    return (
        <button onClick={() => deleteComment()}>
            <FontAwesomeIcon icon={faTrashCan} />
            <span>Supprimer</span>
            </button>
    );
};

export default DeleteComment;