import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { WiMoonAltThirdQuarter } from 'react-icons/wi'
import { CgProfile } from 'react-icons/cg'

const Navbar = () => {
  // Color Theme
  const { theme, setTheme } = useTheme()

  // Handle Color Theme
  function handleTheme() {
    theme === "dark" ? setTheme("light") : setTheme("dark")
    console.log("Theme: " + theme);
  }

  const { data: session } = useSession();

  console.log(session);


  return (
    <>
      {/* Container for Navbar */}
      <div className='top-0 fixed w-full h- md:h-20 z-[100] bg-opacity-20 backdrop-blur-lg drop-shadow-lg'>
        <div className='flex justify-between items-center w-full h-full px-10'>
          {/* Left */}
          <div>
            <Link href='/'>BeFit</Link>
          </div>

          {/* Middle */}
          {/* <div>Middle</div> */}

          {/* Right */}
          <div className='flex flex-cols'>
            {/* Button Theme Toggle */}
            <button onClick={handleTheme} className='border rounded-lg p-1 mr-4'>
              <WiMoonAltThirdQuarter size={20} />
            </button>

            {/* Log in/out */}
            {!session ?
              (
                <div className='flex flex-cols'>
                  {/* Log In */}
                  <Link href='/account'>
                    <button className='mr-1 border rounded-lg p-1'>Sign In</button>
                  </Link>

                  {/* Empty Avatar */}
                  <CgProfile size={30} />
                </div>
              )
              : (
                <>
                  {/* Log out */}
                  <button onClick={() => signOut()}>Sign Out</button>
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar