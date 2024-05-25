import { Role, User } from "@prisma/client";

export type SideNavItem={
    title:string,
    path:string;
    icon?:JSX.Element;
     submenu?: boolean;
     current: boolean,
  
}
export type CartButtonProps={
   hasSizesOrExtras:boolean, 
   onClick:()=>void,
    basePrice:string, 
    image:string,
}

export interface MenuTilesProps {
    onAddToCart: () => void,
    item: {
        image: string,
        description: string,
        name: string,
        basePrice: string,
        sizes: string[],
        extraIngredientPrices: string[],


    }


    
}

export interface MenuItemsProps{
id:number
        image: string,
        description: string,
        name: string,
        basePrice: string,
        sizes: string[],
        extraIngredientPrices: string[], 
           
}

 export interface CardWrapperProps {
   children:React.ReactNode,
   headerLabel:string,
   backButtonLabel:string,
   backButtonHref:string,
   showSocial?:boolean,
  
   
}

export interface FileList {
    length: number;
    item(index: number): File | null;
    [index: number]: File;
}

export interface EditableImages{
    link:string;
  
}

export interface Users{
    id:string,
     email: string;
    name: string;
    role: Role;
}

export interface AuthState {
    user: Users | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isLoggedIn: boolean;
    isAdmin: boolean;
     success: string | null;
}

export interface  ProfileFormValues  {
    name: string;
    email: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
    image:string;
};

export interface ProfileState {
    profile: {
        name: string;
        email: string;
        streetAddress: string;
        postalCode: string;
        city: string;
        country: string;
        image:string;
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isAdmin: boolean;
     success: string | null;
      isLoggedIn: boolean;
}