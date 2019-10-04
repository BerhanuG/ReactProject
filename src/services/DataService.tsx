import { IProdukter, IProdukterList, IOrdrarList } from "../models/ISPList";
import { sp } from "sp-pnp-js";
import { Guid } from "guid-typescript";


export interface IDataService {
    getData(): Promise<IProdukter[]>;
    changeComplete(id: number) : Promise<IProdukter[]>;

    //to handle  mock data
    myOrdrarList(id: number): Promise<IOrdrarList[]>;
    getOrdrarList(): Promise<IOrdrarList[]>;

    //for SharePoint data
    OrdrarList(userId: number, product: IProdukterList[]);
    myOrdrarAndProdukter(orderId: number, products: IProdukterList[]);
}

export class MockDataService implements IDataService {
 

    constructor() {
        this.myOrdrarList = this.myOrdrarList.bind(this);
    }
    
    private _items: IProdukter[] = [
    
        
        { 
        ID: 1, Title: 'Babblarna Book' ,ECWS_x002e_Price: 159, ECWS_x002e_Category: 'Leksaker',
        ECWS_x002e_ImageUrl: { Url: 'https://www.jollyroom.se/leksaker/barnbocker/sagobocker/babblarna-bok-i-bobbos-vaska', Description: 'Babblarna Bok I Bobbos Väska' }
        },
  
        { 
        ID: 2, Title: 'Natti Babblarna ',ECWS_x002e_Price: 89, ECWS_x002e_Category: 'Leksaker',
        ECWS_x002e_ImageUrl: { Url: 'https://www.jollyroom.se/leksaker/barnbocker/sagobocker/babblarna-bok-natti-natti-babblarna', Description: 'Babblarna Bok Natti Natti Babblarna' }
        },    
                
        { 
        ID: 3, Title: 'Babblarna Film ',ECWS_x002e_Price: 129, ECWS_x002e_Category: 'Leksaker',
        ECWS_x002e_ImageUrl: { Url: 'https://www.jollyroom.se/leksaker/babyleksaker/aktivitetsleksaker/beemoo-lyx-aktivitetscenter-blue', Description: 'Beemoo Lyx Aktivitetscenter, Blue'}
        }
  
        ];

        private OrdrarList1: IOrdrarList[] = [];

    public myOrdrarList(id: number): Promise<IOrdrarList[]> {
        console.log("Data source with id from OrdrarList1: ", id);
        let selectedItem: number;
        this._items.map((element) => {
            if (element.ID === id) {
                selectedItem = element.ID;
                id = id - 1;
                this.OrdrarList1.push({ Id: this._items[id].ID, Title: this._items[id].Title, ECWS_x002e_User: 'user01', ECWS_x002e_Date: new Date() });
            }
        });

        return new Promise<IOrdrarList[]>((resolve) => {
            resolve(this.OrdrarList1);
        });
    }

    public getOrdrarList(): Promise<IOrdrarList[]> {
        return new Promise<IOrdrarList[]>((resolve) => {
            resolve(this.OrdrarList1);
        });
    }

    public getData(): (Promise<IProdukter[]>) {
        return new Promise<IProdukter[]>((resolve) => {
            resolve(this._items);
        });
    }

    public changeComplete(id: number): Promise<IProdukter[]> {
        throw new Error("Method not implemented.");
    }

    public myOrdrarAndProdukter() {
        throw new Error("Method not implemented.");
    }

    public OrdrarList(): Promise<IOrdrarList[]> {
        throw new Error("Method not implemented.");
    }
}
