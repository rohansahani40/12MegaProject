import React,{useEffect,useState} from 'react'

import { PostCard,Container } from '../components'
import { useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/config'




function Home() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);
 if(posts.length === 0) {
        return (
            <div className="py-8">
                <Container>
                    <h1 className="text-2xl font-bold">No posts available (LOGIN TO SEE THE POST)</h1>
                </Container>
            </div>
        );
    }
    return (
        <div className="py-8">
            <Container>
                <div className="flex flex-wrap ">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-1/4 px-2 ">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
