import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuMessageCircle } from "react-icons/lu";

import ClickOutside from '../ClickOutside';
import UserOne from '../../assets/images/user/user-01.png';

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li className="relative">
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
          to="#"
        >
          <span
            className={`absolute -top-0.5 -right-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? 'hidden' : 'inline'
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>

          <LuMessageCircle size={20} />
        </Link>

        {/* <!-- Dropdown Start --> */}
        {dropdownOpen && (
          <div
            className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
          >
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2">Messages</h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto">
              <li>
                <Link
                  className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  to="/messages"
                >
                  <div className="h-12.5 w-12.5 rounded-full">
                    <img src={UserOne} alt="User" />
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-black dark:text-white">
                      Mariya Desoja
                    </h6>
                    <p className="text-sm">I like your confidence 💪</p>
                    <p className="text-xs">2min ago</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  to="/messages"
                >
                  <div className="h-12.5 w-12.5 rounded-full">
                    <img src={UserOne} alt="User" />
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-black dark:text-white">
                      Robert Jhon
                    </h6>
                    <p className="text-sm">Can you share your offer?</p>
                    <p className="text-xs">10min ago</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  to="/messages"
                >
                  <div className="h-12.5 w-12.5 rounded-full">
                    <img src={UserOne} alt="User" />
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-black dark:text-white">
                      Henry Dholi
                    </h6>
                    <p className="text-sm">I cam across your profile and...</p>
                    <p className="text-xs">1day ago</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  to="/messages"
                >
                  <div className="h-12.5 w-12.5 rounded-full">
                    <img src={UserOne} alt="User" />
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-black dark:text-white">
                      Cody Fisher
                    </h6>
                    <p className="text-sm">I’m waiting for you response!</p>
                    <p className="text-xs">5days ago</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  to="/messages"
                >
                  <div className="h-12.5 w-12.5 rounded-full">
                    <img src={UserOne} alt="User" />
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-black dark:text-white">
                      Mariya Desoja
                    </h6>
                    <p className="text-sm">I like your confidence 💪</p>
                    <p className="text-xs">2min ago</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        )}
        {/* <!-- Dropdown End --> */}
      </li>
    </ClickOutside>
  );
};

export default DropdownMessage;
