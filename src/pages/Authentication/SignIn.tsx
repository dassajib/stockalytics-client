import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { GoLock } from 'react-icons/go';

import LogoDark from '../../assets/images/logo/logo-dark.svg';
import Logo from '../../assets/images/logo/logo.svg';
import Grettings from '../../components/Grettings/Grettings';

const SignIn = () => {
  return (
    <>
      <div className="min-h-screen rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-2 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>

              <p className="2xl:px-20">
                Welcome back! Sign in to continue growing your business with us.
              </p>

              <Grettings />
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Your Business
              </h2>

              <form>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-2">
                      <AiOutlineMail size={22} className="opacity-60" />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="6+ Characters, 1 Capital letter"
                      className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-2">
                      <GoLock size={22} className="opacity-60" />
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  <span>
                    <FaGoogle size={18} />
                  </span>
                  Sign in with Google
                </button>

                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
