import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFileImage, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';

const ModifyPost = ({ element, setModify, setHidden, local }) => {
    const [text, setText] = useState(element.text)

    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        setFiles(e.target.files)
    };

    async function submit(e) {
        e.preventDefault();
        const data = new FormData();

        if (files.length !== 0) {
            for (let i = 0; i < files.length; i++) {
                data.append('file', files[i]);
            }
        }

        data.append('text', text)
        data.append('userId', local.userId)

        fetch(`http://localhost:3000/api/post/${element._id}`,
            {
                headers: {
                    'Authorization': `Bearer ${local.token}`
                },
                method: "PUT",
                body: data
            })
            .then(() => window.location.reload(false))
            .catch(function (res) { console.log(res) })
    }

    useEffect(() => {

        function trapFocus(element) {
            var focusableEls = element.querySelectorAll('button:not([disabled]), textarea:not([disabled]), input:not([disabled])');
            var firstFocusableEl = focusableEls[0];
            var lastFocusableEl = focusableEls[focusableEls.length - 1];
            var KEYCODE_TAB = 9;

            element.addEventListener('keydown', function (e) {
                var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

                if (!isTabPressed) {
                    return;
                }

                if (e.shiftKey) /* shift + tab */ {
                    if (document.activeElement === firstFocusableEl) {
                        lastFocusableEl.focus();
                        e.preventDefault();
                    }
                } else /* tab */ {
                    if (document.activeElement === lastFocusableEl) {
                        firstFocusableEl.focus();
                        e.preventDefault();
                    }
                }
            });
        }
        const modifypost = document.getElementById('modify-post-content')
        trapFocus(modifypost)
    }, [])

    return (
        <div className='wrapper'>
            <div className="wrapper-fixed"  >
                <div className='wrapper-modify-post'  >
                    <div className='modify-post-container'  >
                        <div className='wrapper-content'  >
                            <aside id='modify-post-content'  >
                                <div className='title'>
                                    <p>Modifier la publication</p>
                                </div>
                                <div className='close-btn' aria-label='fermer'>
                                    <button onClick={() => { setModify(true); setHidden(true) }}>
                                        <FontAwesomeIcon icon={faRectangleXmark} />
                                        <span>Fermer</span>
                                    </button>
                                </div>
                                <div className='form-post-modify'>
                                    <form method="post" action="#" id="modifypost" onSubmit={submit}>
                                        <div className='form-content-modify'>
                                            <TextareaAutosize autoFocus aria-label='modifier commentaire' defaultValue={text} className='text' type="text" maxLength={240} onChange={(e) => setText(e.target.value)} />
                                            <div className="file">
                                                <label htmlFor="file-modify" className='label-file'><FontAwesomeIcon icon={faFileImage} /> Photo</label>
                                                <input id='file-modify' type="file" accept="image/png, image/jpeg, image/jpg" onChange={onInputChange} />
                                                {files.length === 0 ? null : <hr />}
                                                {files.length === 0 ? null : <span>{files[0].name}</span>}
                                            </div>
                                        </div>
                                        <div className='button'>
                                            <button type='submit' name="Submit" onClick={submit}>
                                                <FontAwesomeIcon icon={faPaperPlane} />
                                                <span>Envoyer</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifyPost;