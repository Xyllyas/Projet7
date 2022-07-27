import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faRectangleXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import DeleteComment from './DeleteComment';
import TextareaAutosize from 'react-textarea-autosize';

const ModifyComment = ({ element, comment, local }) => {
    const [change, setChange] = useState(false)
    const [text, setText] = useState(comment.text)

    function modifyComment() {
        const data = {
            text: text
        }
        
        fetch(`http://localhost:3000/api/comment/${element._id}/modify/${comment.commentId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${local.token}`
            },
            method: "PUT",
            body: JSON.stringify(data)
        }).then(() => window.location.reload(false))
        .catch(res => console.log(res))
    }

    return (
        <div className='setup-container-comment'>
            {local.userId === comment.userId || local.role === 'admin'?
                change === false ? (
                    <div className='container-comment'>
                        <div className='comment' key={comment._id}>
                            <h3>{comment.name} {comment.lastName}</h3>
                            <p>{comment.text}</p>
                        </div>
                        <div className="button">
                            <button onClick={() => setChange(true)}>
                                <FontAwesomeIcon icon={faPen} />
                                <span>Modifier</span>
                            </button>
                            <DeleteComment element={element} comment={comment} token={local.token} />
                        </div>
                    </div>
                ) : (
                    <div className='container-comment'>
                        <div className="comment">
                            <h3>{comment.name} {comment.lastName}</h3>
                            <TextareaAutosize defaultValue={text} onChange={(e) => setText(e.target.value)} />
                        </div>
                        <div className="button">
                            <button onClick={() => modifyComment()}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                                <span>Envoyer</span>
                            </button>
                            <button onClick={() => setChange(false)}>
                                <FontAwesomeIcon icon={faRectangleXmark} />
                                <span>Annuler</span>
                            </button>
                        </div>
                    </div>
                )
                : (
                    <div className='container-comment'>
                        <div className='comment' key={comment._id}>
                            <h3>{comment.name} {comment.lastName}</h3>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ModifyComment;