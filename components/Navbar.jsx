'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Denk_One } from 'next/font/google';
import { useSession, signOut } from 'next-auth/react';

// MUI
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FolderIcon from '@mui/icons-material/Folder';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonIcon from '@mui/icons-material/Person'
import { DarkMode, Logout, SettingsInputAntenna, SettingsInputHdmi } from '@mui/icons-material';
import { SettingsIcon } from 'lucide-react';

const font = Denk_One({
    subsets: ["latin"],
    weight: ["400"],
});

const Navbar = () => {

    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    // LEFT drawer
    const [drawerOpen, setDrawerOpen] = useState(false);

    // RIGHT drawer
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const toggleRightDrawer = (open) => () => {
        setRightDrawerOpen(open);
    };

    const navLinks = [
        { label: "Home", url: "/", icon: <HomeIcon /> },
        { label: "Explore", url: "/explore", icon: <ExploreIcon /> },
        { label: "Write Case", url: "/writecase", icon: <EditNoteIcon /> },
        { label: "My Vault", url: "/vault", icon: <FolderIcon /> },
        { label: "Contact", url: "/contact", icon: <ContactMailIcon /> },
    ];
    const naviLinks = [
        { label: "Profile", url: "/profile", icon: <PersonIcon /> },
        { label: "Theme", icon: <DarkMode /> },
        { label: "Settings", url: "", icon: <SettingsIcon /> },
        //{ label: "My Vault", url: "/vault", icon: <FolderIcon /> },
        //{ label: "Contact", url: "/contact", icon: <ContactMailIcon /> },
    ];

    return (
        <section className='sticky top-0 z-50 bg-[#f5f5f5]'>
            <nav className='flex items-center justify-between md:px-8 px-3 py-4 md:py-5 shadow-md font-semibold lg:px-10'>

                {/* 🍔 Hamburger */}
                <button
                    onClick={toggleDrawer(true)}
                    className='lg:hidden ml-3 text-xl text-[#233D4C]'
                >
                    <GiHamburgerMenu />
                </button>

                {/* 🏷 Logo */}
                <Link href={"/"}>
                    <h1 className={`max-md:hidden text-xl text-[#233D4C] md:text-2xl ${font.className}`}>
                        Case<span className='font-bold'>Vault</span>
                    </h1>
                </Link>

                {/* 💻 Desktop Nav */}
                <div className='gap-10 lg:flex hidden items-center'>
                    {navLinks.map((item, index) => (
                        <Link
                            key={index}
                            href={item.url}
                            className={`transition-colors ${pathname === item.url
                                    ? "text-[#F97316]"
                                    : "text-[#233D4C] hover:text-[#F97316]"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* 👤 User */}
                <div className='flex items-center'>
                    {session ? (
                        <Avatar
                            alt={session?.user?.name}
                            src={session?.user?.image}
                            sx={{ width: 36, height: 36 }}
                            className='cursor-pointer'
                            onClick={toggleRightDrawer(true)}
                        />
                    ) : (
                        <Link
                            href={"/signin"}
                            className='ml-10 flex items-center gap-1 text-[#f5f5f5] rounded-full md:px-6 md:py-2 bg-[#233D4C] hover:bg-[#F97316] hover:text-[#233D4C]'
                        >
                            <span className='max-md:hidden'>Sign In</span>
                            <FaRegUserCircle className='text-xl' />
                        </Link>
                    )}
                </div>

                {/* 📱 LEFT Drawer */}
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    <Box
                        sx={{ width: 270 }}
                        className="bg-[#f5f5f5] h-full flex flex-col text-[#233D4C]"
                    >
                        <div className="p-4 border-b border-gray-300">
                            <Link href={"/"}>
                                <h1 className={`text-xl text-[#233D4C] md:text-2xl ${font.className}`}>
                                    Case<span className='font-bold'>Vault</span>
                                </h1>
                            </Link>
                        </div>

                        <List>
                            {navLinks.map((item, index) => {
                                const active = pathname === item.url;

                                return (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                router.push(item.url);
                                                setDrawerOpen(false);
                                            }}
                                            sx={{
                                                backgroundColor: active ? "#FFE4D6" : "transparent",
                                                '&:hover': { backgroundColor: "#f0f0f0" },
                                            }}
                                        >
                                            <ListItemIcon sx={{ color: "#233D4C" }}>
                                                {item.icon}
                                            </ListItemIcon>

                                            <ListItemText primary={item.label} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                </Drawer>

                {/* 👉 RIGHT Drawer (Profile) */}
                <Drawer
                    anchor="right"
                    open={rightDrawerOpen}
                    onClose={toggleRightDrawer(false)}
                >
                    <Box
                        sx={{ width: 270 }}
                        className="bg-[#f5f5f5] h-full flex flex-col text-[#233D4C]"
                    >

                        {/* 👤 User Info */}
                        <div className="p-4 border-b border-gray-300 flex items-center gap-3">
                            {session ? (
                                <>
                                    <Avatar
                                        src={session?.user?.image}
                                        alt={session?.user?.name}
                                    />
                                    <div>
                                        <p className="text-sm font-semibold">
                                            {session?.user?.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {session?.user?.email}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <Link href="/signin">Sign In</Link>
                            )}
                        </div>

                        {/* 📋 Same Links */}
                        <List>
                            {naviLinks.map((item, index) => {
                                const active = pathname === item.url;

                                return (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                router.push(item.url);
                                                setRightDrawerOpen(false);
                                            }}
                                            sx={{
                                                backgroundColor: active ? "#FFE4D6" : "transparent",
                                                '&:hover': { backgroundColor: "#f0f0f0" },
                                            }}
                                        >
                                            <ListItemIcon sx={{ color: "#233D4C" }}>
                                                {item.icon}
                                            </ListItemIcon>

                                            <ListItemText primary={item.label} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>

                        {/* 🚪 Logout */}
                        {session && (
                            <div className="mt-auto p-4 border-t border-gray-300">
                                <div className='flex gap-3 items-center'>
                                <Logout />
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm text-red-500"
                                >
                                    Sign Out
                                </button>
                                </div>
                            </div>
                        )}

                    </Box>
                </Drawer>

            </nav>
        </section>
    )
}

export default Navbar
