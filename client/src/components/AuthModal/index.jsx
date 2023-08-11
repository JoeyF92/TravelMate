import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useAuth } from '../../contexts';
import { useNavigate } from "react-router-dom";
import config from '../../config';

export default function AuthModal({ buttonLabel, showPlaneIcon }) {
    const { user, setUser } = useAuth();
    const [show, setShow] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [loginForm, setLoginForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const [registrationForm, setRegistrationForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    });

    function registrationHandleChange(e) {
      const { name, value } = e.target;
      setRegistrationForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }

    function loginHandleChange(e) {
      const { name, value } = e.target;
      setLoginForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }

    const resetRegistrationForm = () => {
      setRegistrationForm({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        if (isLogin) {
          const response = await axios.post(`${config.baseUrl}/user/login`, {
            username: loginForm.username,
            password: loginForm.password,
          });

          setUser({
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            username: response.data.username,
          });

          if (response.status === 200) {
            localStorage.setItem('user_id', response.data.user_id);
            localStorage.setItem('token', response.data.token);
            navigate('/');
          }
        } else {
          const response = await axios.post(`${config.baseUrl}/user/register`, {
            first_name: registrationForm.firstName,
            last_name: registrationForm.lastName,
            email: registrationForm.email,
            username: registrationForm.username,
            password: registrationForm.password,
          });
    
          if (response.status === 201) {
            alert("Registration successful!");
            resetRegistrationForm();
            handleClose();
          }
        }
    } catch (error) {
      if (isLogin) {
        alert("Login details incorrect!");
      }
      else {
        alert("Unable to register");
      }
    }
  };
    
    const handleClose = () => {
      setShow(false);
    };
  
    const handleShow = () => {
      setIsLogin(buttonLabel === "Login");
      setShow(true);
    };
  
    const toggleForm = () => {
      setIsLogin(!isLogin);
    };
  

  return (
    <>
      <button className="get-started-button" onClick={handleShow}>
        {buttonLabel}{" "}
        {showPlaneIcon && <FontAwesomeIcon icon={faPlane} style={{ marginLeft: '5px' }} />}
      </button>

      <Modal
        className='fade-in'
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
      >
        <Modal.Body className='registrationModal'>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-primary">
                {isLogin ? "Login" : "Create an account"}
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-2" onSubmit={handleSubmit}>
              {isLogin ? (
                  <>
                    {<>
                        <div>
                            <label htmlFor="username" className="block text-sm font-primary leading-6 text-gray-900">Username</label>
                            <div className="mt-2">
                                <input 
                                  onChange={(e) => loginHandleChange(e)}
                                  id="username" 
                                  name="username" 
                                  type="text" 
                                  required 
                                  value={loginForm.username}
                                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"
                                />
                            </div>
                        </div>
  
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-primaryleading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input 
                                  onChange={(e) => loginHandleChange(e)}
                                  id="password" 
                                  name="password" 
                                  type="password" 
                                  required 
                                  value={loginForm.password}
                                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"
                                />
                            </div>
                        </div>
  
                        <div>
                            <button type="submit" className="mt-10 flex w-full justify-center rounded-md bg-theme-blue px-3 py-1.5 text-sm font-primary leading-6 text-white shadow-sm hover:opacity-75">Sign in</button>
                        </div>
                    </>}
                  </>
                ) : (
                  <>
                    {<>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-primary leading-6 text-gray-900">First name</label>
                            <div className="mt-2">
                                <input
                                  onChange={(e) => registrationHandleChange(e)}
                                  id="firstName" 
                                  name="firstName" 
                                  type="text"
                                  required
                                  value={registrationForm.firstName}
                                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-primary leading-6 text-gray-900">Last name</label>
                            <div className="mt-2">
                                <input
                                  onChange={(e) => registrationHandleChange(e)}
                                  id="lastName" 
                                  name="lastName" 
                                  type="text"
                                  required
                                  value={registrationForm.lastName} 
                                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-primary leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input
                                  onChange={(e) => registrationHandleChange(e)}
                                  id="email" 
                                  name="email" 
                                  type="email"
                                  required
                                  value={registrationForm.email} 
                                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-primary leading-6 text-gray-900">Username</label>
                            <div className="mt-2">
                                <input 
                                  onChange={(e) => registrationHandleChange(e)}
                                  id="username" 
                                  name="username" 
                                  type="text"
                                  required
                                  value={registrationForm.username} 
                                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-primaryleading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input 
                                  onChange={(e) => registrationHandleChange(e)}
                                  id="password" 
                                  name="password" 
                                  type="password"
                                  required
                                  value={registrationForm.password}
                                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="mt-10 flex w-full justify-center rounded-md bg-theme-blue px-3 py-1.5 text-sm font-primary leading-6 text-white shadow-sm hover:opacity-75">Sign Up</button>
                        </div>
                    </>}
                  </>
                )}
              </form>

              <p className="mt-10 font-primary text-center text-sm text-gray-500">
                {isLogin ? "Not a member?" : "Already have an account?"} <button className="leading-6 text-theme-blue hover:opacity-75" onClick={toggleForm}>
                  {isLogin ? "Register here" : "Login here"}
                </button>
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}