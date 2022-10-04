import { signIn, signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { WiMoonAltThirdQuarter } from 'react-icons/wi';
import { CgProfile } from 'react-icons/cg';
import { AccountMenu, NavigateMenu } from './NavbarMenus';

const Navbar = () => {
  // Color Theme
  const { theme, setTheme } = useTheme();

  // Handle Color Theme
  function handleTheme() {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
    console.log('Theme: ' + theme);
  }

  const { data: session } = useSession();

  // console.log(session);

  return (
    <>
      {/* Container for Navbar */}
      <div className="top-0 fixed w-full h-10 md:h-20 z-[100] bg-opacity-20 backdrop-blur-lg drop-shadow-lg border-b-2 border-black dark:border-white">
        <div className="flex justify-between items-center w-full h-full px-5 md:px-10">
          {/* Left */}
          <div>
            <Link href="/">BeFit</Link>
          </div>

          {/* Middle */}
          {/* <div>Middle</div> */}

          {/* Right */}
          <div className="flex flex-cols">
            {/* ThreeDot for Navigating to pages */}
            <NavigateMenu />

            {/* Button Theme Toggle */}
            <button onClick={handleTheme} className="p-2 mr-2">
              <WiMoonAltThirdQuarter size={20} />
            </button>

            {/* Log in/out */}
            {!session ? (
              <div className="flex items-center justify-center">
                {/* Log In */}
                <button onClick={() => signIn()} className="mr-1 p-1">
                  Sign In
                </button>

                {/* Empty Avatar */}
                <CgProfile size={30} />
              </div>
            ) : (
              <div className="flex flex-cols">
                {/* Log out */}
                <button onClick={() => signOut()} className="mr-1 p-1">
                  Sign Out
                </button>

                {/* Avatar Image */}
                <AccountMenu session={session} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
