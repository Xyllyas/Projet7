
import Like from './post/Like';
import ModifyPost from './post/ModifyPost';
import DeletePost from './post/DeletePost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEllipsisVertical, faPenToSquare, faMessage } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef, useEffect } from 'react';
import ModifyComment from './comment/ModifyComment';
import React from 'react';
import SendComment from './comment/SendComment';

const CardPost = ({ element, local }) => {
    const [modify, setModify] = useState(true)
    const [nbLike, setNbLike] = useState('')
    const [hidden, setHidden] = useState(true)
    const [size, setSize] = useState(1)
    const [sendComment, setSendComment] = useState(false)
    const menu = useRef()

    const handleClickOutside = e => {
        if (!menu.current.contains(e.target)) {
            setHidden(true);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    return (
        <article className='card-content' key={element._id} >
            <div className='card-content-name'>
                <div className='card-name'>
                    <h2>De {element.name} {element.lastName}</h2>
                    <p>{element.date}</p>
                </div>
                <div className={local.userId === element.userId || local.role === 'admin' ? 'container-menu' : 'hidden'}  >
                    <div className="menu">
                        <button onClick={() => { setHidden(hidden === true ? false : true) }}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                            <span> modifier ou supprimer</span>
                        </button>
                    </div>
                    <div className='wrapper-container-menu' hidden={hidden || modify === false}>
                        <div className='wrapper-menu-modify-delete' ref={menu}>
                            <div className='menu-modify-delete'  >
                                <DeletePost element={element} token={local.token} />
                                <hr />
                                <div className='button modify' onClick={() => setModify(false)}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                    <div>
                                        <button >Modifié</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='content'>
                <div className='card-content-text'>
                    {element.text && <p className='text-content'>{element.text}</p>}
                    {element.imageUrl && <img src={element.imageUrl} alt=""></img>}
                </div>
            </div>
            <div className='likeAndCom'>
                <div className='nbLike'>
                    <FontAwesomeIcon icon={faHeart} />
                    <p>{element.likes + nbLike}</p>
                </div>
                <div className='com'>
                    <p>{element.comments.length}</p>
                    {element.comments.length > 1 ? <p>commentaires</p> : <p>commentaire</p>}
                </div>
            </div>
            <div className='button-likeAndCom'>
                <Like element={element} setNbLike={setNbLike} local={local} />
                <button className={sendComment === false ? 'button-com' : 'button-com active'} onClick={() => sendComment === false ? setSendComment(true) : setSendComment(false)}>
                    <FontAwesomeIcon icon={faMessage} />
                    <span>Commenter</span>
                </button>
            </div>
            <div className='wrapper-wrapper-container-comment'>
                {sendComment === true && <SendComment element={element} local={local} />}
                <div className='wrapper-container-comment'>
                    {
                        element.comments.slice(0, size).map(comment =>
                            <ModifyComment key={comment._id} element={element} comment={comment} local={local} />
                        )

                    }
                </div>
                {
                    size >= element.comments.length ? (element.comments.length === 0 || element.comments.length === size ? null : <button className='more-comment' onClick={() => setSize(1)}>afficher moins de commentaires</button>)
                        : <button className='more-comment' onClick={() => setSize(size + 5)}>afficher plus de commentaires</button>
                }
            </div>
            <div className='modify-post' hidden={modify}>
                {modify === false ?  <ModifyPost element={element} setModify={setModify} setHidden={setHidden} local={local} /> : null}
               
            </div>
        </article >
    );
};

export default CardPost;