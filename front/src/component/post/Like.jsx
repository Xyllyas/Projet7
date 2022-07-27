import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const Like = ({ element, setNbLike, local }) => {
    const [like, setLike] = useState(null)
    const id = local.userId
    const userLike = element.userLiked !== undefined ? element.userLiked.find(user => user === id) : null

    function giveLike() {
        if (like === 1) {
            if (userLike === id) {
                setLike(0)
                setNbLike(-1)
            } else {
                setLike(0)
                setNbLike(0)
            }
        }
        if (like === 0 || like === null) {
            if (userLike === id && like === null) {
                setLike(0)
                setNbLike(-1)
            } else if (userLike === id) {
                setLike(1)
                setNbLike(0)
            } else {
                setLike(1)
                setNbLike(1)
            }
        }
    }

    useEffect(() => {
        function postLike() {
            fetch(`http://localhost:3000/api/post/like/${element._id}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${local.token}`
                    },
                    method: "POST",
                    body: JSON.stringify({ userId: id, like: like })
                })
        }

        if (like !== null) {
            postLike()
        }

    }, [like])

    return (
        <div className='button-like'>
            <button className={(like === 1 || userLike === id) && (like !== 0 && like !== -1) ? 'like like-active' : 'like'} onClick={() => { giveLike() }}>
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>J'aime</span>
            </button>
        </div>
    );
};

export default Like;