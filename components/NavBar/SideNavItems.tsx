import { Icon } from "@iconify/react";

import { SideNavItem } from "@/@types/enum";

const NAV_ITEMS: SideNavItem[] = [
    {
        title: "Home",
        path: "/",
        icon: <Icon icon="lucide:home" width="24" height="24" />,
        current: true,
    },
    {
        title: "Menu",
        path: "#",
        icon: <Icon icon="gg:menu-round" width="24" height="24" />,
        current: false,

    },
    {
        title: "About",
        path: "/settings",
        icon: <Icon icon="lucide:settings" width="24" height="24" />,
        current: false,

    },
    {
        title: "contact",
        path: "",
        icon: <Icon icon="lucide:mail" width="24" height="24" />,
        current: false,
    },
    {
        title: "Login",
        path: "",
        icon: <Icon icon="material-symbols:login" width="24" height="24" />,
        current: false,
    },
    {
        title: "Register",
        path: "",
        icon: <Icon icon="mdi:register" width="24" height="24" />,
        current: false,
    },


];
export default NAV_ITEMS;