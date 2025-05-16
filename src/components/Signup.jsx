import React ,{useState} from 'react';
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate,Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Signup() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data)
           if(userData){
            const userData= await authService.getCurrentUser()
            if(userData){
                dispatch(login(userData));
                navigate("/");
            }
           }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div className="flex items-center justify-center w-full bg-gray-100">
             <div className={`mx-auto w-full max-w-lg p-6 bg-gray-100 rounded-xg border border-black/10`}>
             <div >
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%"   />
                </span>
             </div>
             <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                <Input 
                    label="Full Name:"
                    type="text"
                    placeholder="Enter your full name"
                    {
                        ...register("name",{
                            required:true,
                            minLength:{
                                value:3,
                                message:"Name must be at least 3 characters long"
                            }
                        })
                    }
                    />
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {
                        ...register("email",{
                            required:true,
                            pattern:{
                                value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message:"Please enter a valid email address"
                            }
                        })
                    }
                     />
                    
                  
                
                    <Input 
                    label="password"
                     type="password" 
                     placeholder="Enter your password"
                     { ...register("password",{
                        required:true,
                        minLength:{
                            value:6,
                            message:"Password must be at least 6 characters long"
                        }   
                     })}
                     />
                      <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
             </div>
    </div>
                     
  )
}

export default Signup
