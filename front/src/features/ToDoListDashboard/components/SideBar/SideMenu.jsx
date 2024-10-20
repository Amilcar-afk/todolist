import { Button, Drawer, Sidebar, TextInput} from "flowbite-react";
import { useState } from "react";
import {
    HiInformationCircle,
    HiLogin,
    HiPlusCircle,
    HiSearch,
    HiTag
} from "react-icons/hi";
import {HiCalendarDays, HiCog6Tooth, HiRectangleStack} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";

export function SideMenu({ setOpenModal }) {
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => setIsOpen(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="">
                <Button
                    onClick={() => setIsOpen(true)}
                    className="menu-button m-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-4 text-center"
                >
                    Menu
                </Button>
            </div>
            <Drawer open={isOpen} onClose={handleClose}>
                <Drawer.Header title="MENU" titleIcon={() => <></>}/>
                <Drawer.Items>
                    <Sidebar
                        aria-label="Sidebar with multi-level dropdown example"
                        className="[&>div]:bg-transparent [&>div]:p-0"
                    >
                        <div className="flex h-full flex-col justify-between py-2">
                            <div>
                                <form className="pb-3 md:hidden">
                                    <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                                </form>
                                <Sidebar.Items>
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item onClick={() => setOpenModal(true)} className="navbar-item-hover text-[#ff8d50]" href="#" icon={() => <HiPlusCircle className="text-[#ff8d50] w-6 h-6" />}>
                                            Ajouter une tâche
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item className="navbar-item-hover" href="#" icon={() => <HiRectangleStack className="text-[#ff8d50] w-6 h-6" />}>
                                            Aujourd'hui
                                        </Sidebar.Item>
                                        <Sidebar.Item className="navbar-item-hover" href="#" icon={() => <HiCalendarDays className="text-[#ff8d50] w-6 h-6" />}>
                                            Calendrier
                                        </Sidebar.Item>
                                        <Sidebar.Item className="navbar-item-hover" href="#" icon={() => <HiTag className="text-[#ff8d50] w-6 h-6" />} >
                                            Catégories et Etiquettes
                                        </Sidebar.Item>
                                        <Sidebar.Item className="navbar-item-hover" href="#" icon={() => <HiCog6Tooth className="text-[#ff8d50] w-6 h-6" />}>
                                            Mes informations
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item className="navbar-item-hover" href="#" icon={() => <HiInformationCircle className="text-[#ff8d50] w-6 h-6" />}>
                                            Aide
                                        </Sidebar.Item>
                                        <Sidebar.Item onClick={() => navigate("/logout")} className="navbar-item-hover" href="#" icon={() => <HiLogin className="text-[#ff8d50] w-6 h-6" />}>
                                            Se déconnecter
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                </Sidebar.Items>
                            </div>
                        </div>
                    </Sidebar>
                </Drawer.Items>
            </Drawer>
        </>
    );
}