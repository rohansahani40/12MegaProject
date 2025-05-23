import React from 'react';
import { useEffect } from 'react';
import { PostForm, Container } from '../components'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'

function EditPost() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true)
                setError(null)
                const postData = await appwriteService.getPost(slug)
                if (postData) {
                    setPost(postData)
                } else {
                    setError("Post not found")
                    navigate("/")
                }
            } catch (error) {
                console.error("Error fetching post:", error)
                setError("Failed to load post")
                navigate("/")
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchPost()
        } else {
            navigate("/")
        }
    }, [slug, navigate])

    if (loading) {
        return (
            <div className="py-8">
                <Container>
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-64 bg-gray-200 rounded mb-4"></div>
                    </div>
                </Container>
            </div>
        )
    }

    if (error) {
        return (
            <div className="py-8">
                <Container>
                    <div className="text-red-500">{error}</div>
                </Container>
            </div>
        )
    }

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
