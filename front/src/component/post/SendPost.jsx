import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';

function SendPost({ local }) {
    const [files, setFiles] = useState([]);
    const [text, setText] = useState("")

    const onInputChange = (e) => {
        setFiles(e.target.files)
    };

    const submit = (e) => {
        e.preventDefault();
        const data = new FormData();
        if (files.length !== 0) {
            for (let i = 0; i < files.length; i++) {
                data.append('file', files[i]);
            }
        }
        data.append('name', local.name)
        data.append('lastName', local.lastName)
        data.append('text', text)
        data.append('userId', local.userId)

        if (files.length !== 0 || text !== "") {
            fetch('http://localhost:3000/api/post',
                {
                    headers: {
                        'Authorization': `Bearer ${local.token}`
                    },
                    method: "POST",
                    body: data
                })
                .then(() => window.location.reload(false))
                .catch(function (res) { console.log(res) })
        }
    }

    return (
        <div className='form-post'>
            <form method="post" onSubmit={submit}>
                <div className='form-content'>
                    <TextareaAutosize className='text' aria-label={`Quoi de neuf, ${local.name} ${local.lastName} ?`} type="text" maxLength={240} placeholder={`Quoi de neuf, ${local.name} ${local.lastName} ?`} onChange={(e) => setText(e.target.value)} />
                    <div className="file">
                        <label htmlFor="file" className='label-file'><FontAwesomeIcon icon={faFileImage} /> Photo</label>
                        <input id='file' type="file" onChange={onInputChange} />
                        {files.length === 0 ? null : <hr />}
                        {files.length === 0 ? null : <span>{files[0].name}</span>}
                    </div>
                </div>
                <button type="submit" name="Submit"><FontAwesomeIcon icon={faPaperPlane} /> <span>envoyer</span></button>
            </form>
        </div>
    )
}

export default SendPost