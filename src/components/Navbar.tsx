// import { signIn, signOut, useSession } from 'next-auth/react';
import { signIn, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { AccountMenu, NavigateMenu } from './NavbarMenus';

const Navbar = () => {
  // Color Theme
  const { theme, setTheme } = useTheme();

  // Handle Color Theme
  function handleTheme() {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
    console.log('Theme: ' + theme);
  }

  const { status } = useSession();

  // console.log(session);

  return (
    <>
      {/* Container for Navbar */}
      <div className="top-0 fixed w-full h-10 md:h-20 z-[100] bg-opacity-20 backdrop-blur-lg drop-shadow-lg border-b-2 border-black dark:border-white">
        <div className="flex justify-between items-center w-full h-full px-5 md:px-10">
          {/* Left */}
          <div className="flex items-center justify-center gap-5">
            <Link href="/">BeFit</Link>
            {/* ThreeDot for Navigating to pages */}
            <NavigateMenu />
          </div>

          {/* Middle */}
          {/* <div>Middle</div> */}

          {/* Right */}
          <div className="flex flex-cols">
            {/* Button Theme Toggle */}
            <button onClick={handleTheme} className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </button>

            {/* Log in/out */}
            {status === 'authenticated' || status === 'loading' ? (
              <div className="flex flex-cols ml-2">
                {/* Log out */}
                {/* <button onClick={() => signOut()} className="mr-1 p-1">
                  Sign Out
                </button> */}

                {/* Avatar Image */}
                <AccountMenu />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {/* Log In */}
                <button onClick={() => signIn()} className="mr-1 p-1">
                  Sign In
                </button>

                {/* Empty Avatar */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
