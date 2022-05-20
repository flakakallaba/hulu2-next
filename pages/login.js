
import { FcGoogle } from 'react-icons/fc'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { firebaseApp } from '../firebase-config';
import { useRouter } from 'next/router';


const Login = () => {

    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    const router = useRouter()

    const signIn = async () => {
        const { user } = await signInWithPopup(firebaseAuth, provider)
        const { refreshToken, providerData } = user

        localStorage.setItem('user', JSON.stringify(providerData))
        localStorage.setItem("accessToken", JSON.stringify(refreshToken))
        // console.log(refreshToken, providerData)
        router.push("/");
    }

    return (
        <div className='w-screen h-screen bg-white flex  justify-center items-center'>

            <button className=" flex justify-center items-center  p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                onClick={signIn}>
                <span className=" flex justify-center items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ">
                    <FcGoogle fontSize={40} className="" />
                    <p className='text-lg font-semibold ml-3'>Sign in with Google</p>
                </span>
            </button>
        </div>
    );
}
export default Login