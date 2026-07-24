import Login from '../../components/Auth/Login.jsx'
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';


const LoginPage = () => {
  // const { isAuthenticated } = useSelector((state) => state.user);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if(isAuthenticated === true) navigate("/")
  // },[])

  return (
    <div>
        <Login/>
    </div>
  )
}

export default LoginPage