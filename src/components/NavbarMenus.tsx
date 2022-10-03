import React, { Fragment } from 'react'
import { Menu, Transition } from "@headlessui/react";
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import router from 'next/router';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const AccountMenu: React.FC<{ session: Session }> = ({ session }) => {

  return (
    <>
      {/* Menu for Account*/}
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button as="div" role="navigation" aria-label="hamburger menu to navigate to pages">
          <div className='hover:shadow hover:shadow-light-color-bg rounded-xl flex items-center justify-center'>
            <Image
              className="rounded-full"
              // Just casted as string because next see's string | undefined -> can't be undefined
              src={session?.user?.image === undefined ? "/assets/avatar.png" : session?.user?.image as string}
              alt="profile image"
              width="30"
              height="30"
            />
          </div>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#0e0e10] ring-1 ring-white ring-opacity-5 focus:outline-none">
            {/* <Menu.Items> */}
            <Menu.Item>
              {({ active }) => (
                <button
                  name={"account"}

                  className={classNames(
                    active
                      ? "bg-gray-500 text-gray-100"
                      : "text-gray-200",
                    "text-left w-full block px-4 py-2 text-sm"
                  )}

                  onClick={() => {
                    router.push("/account")
                  }}>
                  Account
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  name={!session.user ? "Login" : "Logout"}

                  className={classNames(
                    active
                      ? "bg-gray-500 text-gray-100"
                      : "text-gray-200",
                    "text-left w-full block px-4 py-2 text-sm"
                  )}

                  onClick={() => {
                    { !session.user ? signIn() : signOut() }
                  }}>

                  {!session.user ? "Login" : "Logout"}
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  name={"account"}

                  className={classNames(
                    active
                      ? "bg-gray-500 text-gray-100"
                      : "text-gray-200",
                    "text-left w-full block px-4 py-2 text-sm"
                  )}

                  onClick={() => {
                    router.push('https://github.com/zachuri/t3-learn')
                  }}>
                  Source
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

const NavbarMenus = () => {
  return (
    <div>NavbarMenus</div>
  )
}

export default NavbarMenus