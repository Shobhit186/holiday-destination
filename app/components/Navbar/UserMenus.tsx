'use client';
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
// import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";

interface UsermenuProps {
  currentUser?: SafeUser | null
}
const UserMenus:React.FC<UsermenuProps> = ({currentUser}) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
  }, [currentUser, loginModal])
  return (
    <div className="relative">
      <div className="gap-3 flex flex-row items-center">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer hover:bg-neutral-100" onClick={onRent}>
          Your Holiday Destination
        </div>
        <div onClick={toggleOpen} className="md:px-2 md:py-1 p-4 border-[1px] items-center border-neutral-200 rounded-full flex flex-row gap-3 cursor-pointer transition hover:shadow-md">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src="/images/avatar.png" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute shadow-md rounded-xl w-[40vw] bg-white overflow-hidden top-12 text-sm md:w-3/4 right-0">
          <div className="flex flex-col cursor-pointer">
            { currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My Trips"
                />
                <MenuItem
                  onClick={() => router.push("/favourites")}
                  label="My Favorite"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My Listings"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="Upcoming Reservations"
                />
                <MenuItem
                  onClick={() => { }}
                  label="View Profile"
                />
                <MenuItem
                  onClick={rentModal.onOpen}
                  label="Your Holiday Destination"
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label="Login"
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="Register"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenus;