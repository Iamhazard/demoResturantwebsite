export type SideNavItem={
    title:string,
    path:string;
    icon?:JSX.Element;
     submenu?: boolean;
     current: boolean,
  
}