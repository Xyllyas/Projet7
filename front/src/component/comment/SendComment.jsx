import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';

const SendComment = ({ element, local }) => {
    const [text, setText] = useState("")
    const [error, setError] = useState("false")
    const config = {
        headers: {
            'Authorization': `Bearer ${local.token}`
        }
    }
    
    const submit = (e) => {
        e.preventDefault();

        const data = {
            name: local.name, lastName: local.lastName, text: text, userId: local.userId
        }

        if (text === "") {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 1000)
        } else {

            axios.post(`http://localhost:3000/api/comment/${element._id}`, data, config
            )
                .then(() => {
                    window.location.reload(false)
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }

    return (
        <div className='form-comment'>
            <form method="post" action="#" id="#" onSubmit={submit}>
                <div className="container-text">
                <TextareaAutosize autoFocus className={error === true ? 'textarea-error' : null} name="text" onChange={(e) => setText(e.target.value)} maxLength="240" />
                </div>
                <button type='submit'><FontAwesomeIcon icon={faPaperPlane} /></button>
            </form>
        </div>
    );
};

export default SendComment;