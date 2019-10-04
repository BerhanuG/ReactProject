import { IProdukter, IProdukterList, IOrdrarList } from "../models/ISPList";
import { sp } from "sp-pnp-js";
import { Guid } from "guid-typescript";
import { IDataService } from '../services/DataService';

export class PnPDataService implements IDataService {
    public changeComplete(id: number): Promise<IProdukter[]> {
        throw new Error("Method not implemented.");
    }

  
    constructor() {
        this.OrdrarList = this.OrdrarList.bind(this);
        this.myOrdrarAndProdukter = this.myOrdrarAndProdukter.bind(this);
    }
//This is to create a list of order in the Ordrar list with UserId and Specific date in the sharepoint List
    public OrdrarList(userId: number, produkter: IProdukterList[]) {

        let guidNo = Guid.create().toString();

        sp.web.lists.getByTitle('Ordrar').items.add({
            Title: 'Ordrar_' + guidNo,
            ECWS_x002e_UserId: userId,
            ECWS_x002e_Date: new Date()
        }).then((ordrarId) => {
            console.log("This is Id for Ordrar list: ", ordrarId.data.Id);

            // Orderrader
            this.myOrdrarAndProdukter(ordrarId.data.Id, produkter);
        });
    }
// This is to create a list of OrderId and ProductId in the Orderrader in the sharepoint List
    public myOrdrarAndProdukter(ordrarId: number, produkter: IProdukterList[]) {

        for (let i = 0; i < produkter.length; i++) {

            let guidNo = Guid.create().toString();

            sp.web.lists.getByTitle('Orderrader').items.add({
                Title: guidNo,
                ECWS_x002e_OrderId: ordrarId,
                ECWS_x002e_ProductId: produkter[i].Id
            }).then((oId) => {
                console.log("This is Id for Ordrar and produkter list: ", oId.data.Id);
                console.log("list: ", oId);
 
            });

        }
    }

    public async getData(): Promise<IProdukter[]> {
        const result = await sp.web.lists.getByTitle('Produkter').items.get();
        return result;
    }

    public myOrdrarList(id: number): Promise<IOrdrarList[]> {
        throw new Error("Method not implemented.");
    }
    public getOrdrarList(): Promise<IOrdrarList[]> {
        throw new Error("Method not implemented.");
    }
  
}
