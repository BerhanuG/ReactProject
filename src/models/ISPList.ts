export interface IProdukter{
    ID:number;
    Title:string;
    ECWS_x002e_Price:number;
    ECWS_x002e_Category:string;
    //Sold: boolean;
    ECWS_x002e_ImageUrl: {
      Description: string,
      Url: string
    };
    
  }

  export interface IProdukterList { 
    Id: number;  
    Price: number;
    ImageUrl: {
      Description: string,
      Url: string
    };
  }
  
  export interface IOrdrarList {
    Id: number;
    Title: string;
    ECWS_x002e_User: string;
    ECWS_x002e_Date: Date;
  }
  