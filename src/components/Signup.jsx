import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()  // Capture errors

    const create = async (data) => {
        setError("")
        try {
            const account = await authService.createAccount(data)
            if (account) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) {
                    dispatch(login(currentUser))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
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

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Full name is required",
                            })}
                        />
                        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}

                        <Input
                            label="Codeforces Id: "
                            type="text"
                            placeholder="Enter your Codeforces Id"
                            {...register("codeforcesId", {
                                required: "Codeforces ID is required",
                            })}
                        />
                        {errors.codeforcesId && <p className="text-sm text-red-600">{errors.codeforcesId.message}</p>}

                        <Input
                            label="Codechef Id: "
                            type="text"
                            placeholder="Enter your Codechef Id"
                            {...register("codechefId", {
                                required: "Codechef ID is required",
                            })}
                        />
                        {errors.codechefId && <p className="text-sm text-red-600">{errors.codechefId.message}</p>}

                        <Input
                            label="Leetcode Id: "
                            type="text"
                            placeholder="Enter your Leetcode Id"
                            {...register("leetcodeId", {
                                required: "Leetcode ID is required",
                            })}
                        />
                        {errors.leetcodeId && <p className="text-sm text-red-600">{errors.leetcodeId.message}</p>}

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
