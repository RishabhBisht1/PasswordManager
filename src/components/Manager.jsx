import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from "uuid";


const Manager = () => {
    const ref = useRef();

    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () =>{
        let req=await fetch("http://localhost:3000")
        let passwords=await req.json();
        console.log("Fetched passwords:", passwords);
        setpasswordArray(passwords);
    }

    useEffect(() => {
        getPasswords();
        
    }, [])


    const [form, setform] = useState({
        website: "",
        username: "",
        password: ""
    })

    const passwordRef = useRef();

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    const showPassword = () => {
        // alert('Show password functionality is not implemented yet.');
        if (ref.current.src === "https://cdn.lordicon.com/xzxvucii.json") { //dont show password
            ref.current.src = "https://cdn.lordicon.com/vgpkjbvw.json"
            passwordRef.current.type = "text";
        } else {
            ref.current.src = "https://cdn.lordicon.com/xzxvucii.json" //show password
            passwordRef.current.type = "password";
        }
    }

    const savePassword = async () => {
        if(form.id){
            await fetch("http://localhost:3000", {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id: form.id })
        });

        }
        const id=form.id || uuidv4();
        let res=await fetch("http://localhost:3000",{
            method:"POST",
            headers:{ "content-type":"application/json" },
            body:JSON.stringify({...form, id })
        })
        const newPasswordArray = [...passwordArray.filter(item=> item.id !== form.id), { ...form, id}];

        setpasswordArray(newPasswordArray);
        // Clear the form and reset the ID
        setform({ website: "", username: "", password: "" });
        console.log("Saved successfully:", newEntry);
    }



    const deletePassword = async (id) => {
        console.log("Deleting password with id:", id);
        let confirmDelete = confirm("Are you sure you want to delete this password?");
        if (confirmDelete) {
            let res=await fetch("http://localhost:3000",{
            method:"DELETE",
            headers:{ "content-type":"application/json" },
            body:JSON.stringify({id})
        })
        let data = await res.json();
        console.log("Delete response:", data);
        // update state only after backend confirms deletion
        const newPasswordArray = passwordArray.filter(item => item.id !== id);
        setpasswordArray(newPasswordArray);
        }

    }
    const editPassword = (id) => {
        console.log("Editing password with id:", id);
        setform({...passwordArray.find(item => item.id === id), id: id});
        // setpasswordArray(passwordArray.filter(item => item.id !== id)); // remove the item being edited from the list to avoid duplicates when saving
        
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });

        navigator.clipboard.writeText(text)
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
            <div></div>

            <div className="mycontainer px-20">
                <h1 className="text-4xl font-bold text-center">
                    <span className='text-green-700'>&lt;</span>
                    Password
                    <span className='text-green-500'>Manager/&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center">Manage your passwords securely and efficiently.</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.website} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type='text' name="website" id="" />
                    <div className="flex w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-green-500 w-full p-4 py-1' type='text' name="username" id="" />
                        <div className="relative"></div>

                        <div className="relative flex items-center">
                            <input
                                value={form.password} onChange={handleChange}
                                ref={passwordRef}
                                placeholder='Enter password'
                                className='rounded-full border border-green-500 w-full px-4 py-1'
                                type='password'
                                name="password"
                            />
                            <span className='absolute right-3 flex items-center' onClick={showPassword}>
                                <lord-icon
                                    ref={ref}
                                    src="https://cdn.lordicon.com/xzxvucii.json"
                                    trigger="hover"
                                    style={{ width: '20px', height: '20px' }} // Use style for web components
                                ></lord-icon>
                            </span>
                        </div>


                    </div>

                    <button className='flex justify-center items-center bg-green-400 border border-green-900 rounded-full px-4 py-2 w-fit hover:bg-green-300' onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#000000,secondary:#000000"
                        ></lord-icon>
                        Save Password
                    </button>

                </div>

                <div className="passwords ">
                    <h2 className='font-bold text-xl py-4'>
                        Your Saved Passwords
                    </h2>

                    {passwordArray.length === 0 && <p className='text-green-700'>No passwords saved yet.</p>}

                    {passwordArray.length !== 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className="bg-green-700 text-white">
                                <tr>
                                    <th className="py-2">Website</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index} className="border-b border-white">
                                            {/* Website Column */}
                                            <td className="py-2 border-x border-white">
                                                <div className="flex items-center justify-center gap-2">
                                                    <a href={item.website} target="_blank" rel="noreferrer" className="hover:underline">
                                                        {item.website}
                                                    </a>
                                                    <div className="cursor-pointer" onClick={() => copyText(item.website)}>
                                                        <lord-icon
                                                            style={{ width: "20px", height: "20px" }}
                                                            src="https://cdn.lordicon.com/ifuloeiz.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Username Column */}
                                            <td className="py-2 border-x border-white">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span>{item.username}</span>
                                                    <div className="cursor-pointer" onClick={() => copyText(item.username)}>
                                                        <lord-icon
                                                            style={{ width: "20px", height: "20px" }}
                                                            src="https://cdn.lordicon.com/ifuloeiz.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Password Column */}
                                            <td className="py-2 border-x border-white">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span>{"*".repeat(item.password.length)}</span>
                                                    <div className="cursor-pointer" onClick={() => copyText(item.password)}>
                                                        <lord-icon
                                                            style={{ width: "20px", height: "20px" }}
                                                            src="https://cdn.lordicon.com/ifuloeiz.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border-x border-white">
                                                <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}><lord-icon
                                                    src="https://cdn.lordicon.com/ggtzkcyr.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon></span>

                                                <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}><lord-icon
                                                    src="https://cdn.lordicon.com/xyfswyxf.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon></span>

                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}

                </div>



            </div>
        </>
    )
}

export default Manager