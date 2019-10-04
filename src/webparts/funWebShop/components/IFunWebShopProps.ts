import { IProdukter, IProdukterList } from "../../../models/ISPList";

export interface IFunWebShopProps {
  description: string;  
  showNumberOfProdukter: number;
  produkterList: IProdukter[];
  userId: number; 

  //changeComplete(i: number): Promise<IProdukter[]>;

  SPDataUpdate(userId: number, products: IProdukterList[]);
  ordrarAndProdukterUpdate(orderId: number, products: IProdukterList[]);
}
