import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  // Color Theme
  const { theme, setTheme } = useTheme()

  function handleTheme() {
    theme === "dark" ? setTheme("light") : setTheme("dark")
    console.log("Theme: " + theme);
  }

  return (
    <>
      <div>
        <div>Navbar</div>
        <button onClick={handleTheme} className="border border-black rounded-lg">Toggle Theme</button>
      </div>
    </>
  )
}

export default Navbar