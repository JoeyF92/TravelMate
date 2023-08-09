import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

export default function AuthModal({ buttonLabel, showPlaneIcon }) {
    const [show, setShow] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
  
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
              <form className="space-y-2" action="#" method="POST">
              {isLogin ? (
                  <>
                    {<>
                        <div>
                            <label for="username" class="block text-sm font-primary leading-6 text-gray-900">Username</label>
                            <div className="mt-2">
                                <input id="username" name="username" type="text" required className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"/>
                            </div>
                        </div>
  
                        <div>
                            <div className="flex items-center justify-between">
                                <label for="password" className="block text-sm font-primaryleading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"/>
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
                            <label for="firstName" class="block text-sm font-primary leading-6 text-gray-900">First name</label>
                            <div className="mt-2">
                                <input id="firstName" name="firstName" type="text" required className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"/>
                            </div>
                        </div>

                        <div>
                            <label for="lastName" class="block text-sm font-primary leading-6 text-gray-900">Last name</label>
                            <div className="mt-2">
                                <input id="lastName" name="lastName" type="text" required className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm "/>
                            </div>
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-primary leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"/>
                            </div>
                        </div>

                        <div>
                            <label for="username" class="block text-sm font-primary leading-6 text-gray-900">Username</label>
                            <div className="mt-2">
                                <input id="username" name="username" type="text" required className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label for="password" className="block text-sm font-primaryleading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"/>
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
