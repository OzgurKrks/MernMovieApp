import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/authSlice";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const [navbar, setNavbar] = useState(false);

  return (
    <nav className='w-full bg-white  shadow sticky top-0 z-50'>
      <div className='justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8'>
        <div>
          <div className='flex items-center justify-between py-3 md:py-5 md:block'>
            <Link to='/'>
              <a href='#'>
                <h2 className='text-2xl font-bold text-blue-700'>Movies</h2>
              </a>
            </Link>
            <div className='md:hidden'>
              <button
                className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 text-blue-700'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 text-blue-700'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
              <Link to='/'>
                <li className='text-blue-700 hover:text-blue-400'>
                  <a href='#'>Home</a>
                </li>
              </Link>
              {user && (
                <Link to='/favorites'>
                  <li className='text-blue-700 hover:text-blue-400'>
                    <a href='#'>Favorites</a>
                  </li>
                </Link>
              )}
            </ul>

            {user ? (
              <div className='mt-3 space-y-2 lg:hidden md:inline-block'>
                <Link to='/login'>
                  <a
                    href='#'
                    className='inline-block w-full px-4 py-2 text-center text-black rounded-md shadow '
                  >
                    {user ? user.email : ""}
                  </a>
                </Link>
                <Link to='/register'>
                  <a
                    onClick={onLogout}
                    href='#'
                    className='inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100'
                  >
                    Log out
                  </a>
                </Link>
              </div>
            ) : (
              <div className='mt-3 space-y-2 lg:hidden md:inline-block'>
                <Link to='/login'>
                  <a
                    href='#'
                    className='inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800'
                  >
                    Log in
                  </a>
                </Link>
                <Link to='/register'>
                  <a
                    href='#'
                    className='inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100'
                  >
                    Register
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
        {user ? (
          <div className='hidden space-x-2 md:inline-block'>
            <a href='#' className='px-4 py-2 text-black'>
              {user ? user.email : ""}
            </a>

            <Link to='/register'>
              <a
                onClick={onLogout}
                href='#'
                className='px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100'
              >
                Log out
              </a>
            </Link>
          </div>
        ) : (
          <div className='hidden space-x-2 md:inline-block'>
            <Link to='/login'>
              <a
                href='#'
                className='px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800'
              >
                Log in
              </a>
            </Link>
            <Link to='/register'>
              <a
                href='#'
                className='px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100'
              >
                Register
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
