import React ,{useCallback} from 'react'
import {useform} from 'react-hook-form'
import {Button , Input ,Select, RTE} from '../index'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../../store/postSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteService from '../../appwrite/config'


function PostForm({post}) {
    const {register,handleSubmit,watch, setValue,control ,getValues} = useform({
        defaultValues:{
        title : post?.title|| '',
        slug: post?.slug || '',
        content: post?.content || '', 
        status: post?.status || 'active',       
        },
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.user.userData)
    const submit = async (data) => {
        if(post ){
            
          }}
  return (
    <div>
      
    </div>
  )
}

export default PostForm