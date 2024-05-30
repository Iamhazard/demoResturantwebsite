import { Role, User} from "@prisma/client";

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
    user: User | null; 
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    sessionToken: string | null;
    isLoggedIn: boolean;
    isAdmin: boolean;
    success: string | null;
    users: User[];
}

export interface  ProfileFormValues  {
    name: string;
    email: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
    userId:string;
    image:string;
};

export interface ProfileState {
    profile:ProfileFormValues |null ,
        name: string;
        email: string;
        streetAddress: string;
        userId:string;
        postalCode: string;
        city: string;
        country: string;
        image:string;
         error: string | null;
        success: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    isAdmin: boolean;
      isLoggedIn: boolean;
}




export interface CategoryState {
    category: string| null;
    userId:string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
     success: string | null;
}