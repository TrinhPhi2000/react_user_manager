import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Usercontext';
import { handleLoginRedux } from '../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const isLoading = useSelector((state) => state.user.isLoading);
    const account = useSelector((state) => state.user.account);

    // useEffect(() => {
    //     let token = localStorage.getItem('token');
    //     if (token) {
    //         navigate('/');
    //     }
    // }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Missing email or password');
            return;
        } else {
            dispatch(handleLoginRedux(email, password));
            // let res = await loginAPI(email.trim(), password);

            // if (res && res.token) {
            //     loginContext(email, res.token);
            //     navigate('/');
            // } else {
            //     if (res && res.status === 400) {
            //         toast.error(res.data.error);
            //     }
            // }
        }
    };
    const handleGoBkac = () => {
        navigate('/');
    };
    const handlePressEnter = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    };
    useEffect(() => {
        if (account && account.auth === true) {
            navigate('/');
        }
    }, [account]);
    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Log in</div>
                <div className="text">Email or useraname (eve.holt@reqres.in)</div>
                <input
                    type="text"
                    placeholder="Email or username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <div className="input-2">
                    <input
                        type={isShowPassword === true ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handlePressEnter(event)}
                    />
                    <i
                        className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                </div>
                <button
                    className={email && password ? 'active' : ''}
                    disabled={email && password ? false : true}
                    onClick={() => handleLogin()}
                >
                    {isLoading && <i className="fa-solid fa-sync fa-spin"></i>}
                    &nbsp; Login
                </button>
                <div className="back">
                    <i className="fa-solid fa-angles-left"></i>{' '}
                    <span onClick={() => handleGoBkac()}> &nbsp; Go back</span>
                </div>
            </div>
        </>
    );
};
export default Login;
