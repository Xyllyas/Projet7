import React from 'react';
import { useEffect, useState } from 'react';
import SendPost from '../component/post/SendPost';
import CardPost from '../component/CardPost';

const Home = ({local}) => {
    const [post, setPost] = useState([])
    
    useEffect(() => {
        fetch('http://localhost:3000/api/post', {
            headers:{
                'Authorization':  `Bearer ${local.token}`
            },
        })
            .then(res => res.json())
            .then(data => setPost(data))
    }, [])

    return (
        <div id='home' >
            <h1>Bienvenue {local.name} {local.lastName}</h1>
            <SendPost local={local} />
            {
                post.sort((a,b)=> (a.date < b.date) ? 1 : -1).map(element =>
                        <CardPost key={element._id} element={element} local={local}/>
                )
            }
        </div>  
    );
};

export default Home;