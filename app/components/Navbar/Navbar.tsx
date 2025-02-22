'use client';
import Container from '../Container'
import Logo from './Logo'
import Categories from './Categories';
import Search from "./Search"
import { Suspense } from 'react';
import UserMenus from './UserMenus';

// interface NavbarProps {
//   currentUser?: SafeUser | null
// }
const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className='py-4 border-b-[1px] border-gray-200'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                     <Logo />
                     <Search />
                     <UserMenus />
                </div>
            </Container>
            <Suspense fallback={<div>Loading...</div>}>
            <Categories />
            </Suspense>
        </div>
    </div>
  )
}

export default Navbar