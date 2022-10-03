import { useTheme } from 'next-themes'
import Link from 'next/link'

const Navbar = () => {
  // Color Theme
  const { theme, setTheme } = useTheme()

  function handleTheme() {
    theme === "dark" ? setTheme("light") : setTheme("dark")
    console.log("Theme: " + theme);
  }

  return (
    <>
      {/* Container for Navbar */}
      <div className='top-0 fixed w-full h-10 md:h-15 z-[100] bg-opacity-20 backdrop-blur-lg drop-shadow-lg'>
        <div className='flex justify-between items-center w-full h-full px-10'>
          {/* Left */}
          <div>
            <Link href='/'>BeFit</Link>
          </div>

          {/* Middle */}
          <div>Middle</div>

          {/* Right */}
          <div>
            <button onClick={handleTheme} className='border border-black dark:border-white rounded-lg'>Toggle Theme</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Navbar