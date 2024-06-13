import Menuitems, { Size } from "@/components/layout/MenuitemsForm";


export type Role ={
    ADMIN:string,
    USER:string
}

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

export type MenuItemsProps = {
    id: string;
    itemName: string;
    Description: string;
    categoryId: string;
    basePrice: string;
    image?: string; 
    sizes?: Size[];
    extraIngredientPrices?: Size[];
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
    item(index: string): File | null;
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
    sessionToken: string | null;
    isLoggedIn: boolean;
    isAdmin: boolean;
    success: string | null;
    users: Users[];
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
   id: string;
  userId: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryPageProps {
    category: CategoryState| null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    success: string | null;

}
export interface DeleteButtonPros {
    label:string, 
    onDelete: ()=>{}
}

export interface MenuitemsProps{
  itemName:string;
  Description:string;
  categoryId:string;           
  category:string;          
  image:string;              
  extraIngredientPrices:Size[];
  sizes:Size[];            
  basePrice:string;            

}

