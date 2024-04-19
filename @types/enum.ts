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

        image: string,
        description: string,
        name: string,
        basePrice: string,
        sizes: string[],
        extraIngredientPrices: string[], 
           
}