import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Logo } from "../ui/logo";
import { faHouse, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { SearchInput } from "../ui/search-input";
import { NavItem } from "../nav/nav-item";
import { NavLogout } from "../nav/nav-logout";

type Props = {
    closeAction: () => void;
};

export const HomeMenu = ({ closeAction }: Props) => {
    return (
        <div className="fixed inset-0 p-6 bg-black">
            <div className="flex justify-between items-center">
                <Logo size={32}/>
                <div onClick={closeAction} className="cursor-pointer flex justify-center items-center size-12 rounded-full border-2 border-gray-900 ">
                    <FontAwesomeIcon icon={faXmark} className="text-xl"/>
                </div>
            </div>

            <div className="my-6">
                <SearchInput/>
            </div>

            <div>
                <NavItem
                    href="/home"
                    icon={faHouse}
                    label="Home Page"
                />

                <NavItem
                    href="/user"
                    icon={faUser}
                    label="My Perfil"
                />

                <NavLogout/>
            </div>
        </div>
    )
}