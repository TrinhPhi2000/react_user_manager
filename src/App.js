import './App.scss';
import Header from './components/Header';

import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import { useEffect } from 'react';

import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { handleRefesh } from './redux/actions/userAction';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(handleRefesh());
            // loginContext(localStorage.getItem('email'), localStorage.getItem('token'));
        }
    }, []);
    return (
        <>
            <div className="app-container">
                <Header />
                <Container>
                    <AppRoutes />
                </Container>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
