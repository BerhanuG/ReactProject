import * as React from 'react';
import styles from './FunWebShop.module.scss';
import { IFunWebShopProps } from './IFunWebShopProps';
import ProdukterItems from './ProdukterItems';
import ProdukterCart from './ProdukterCart';
import { IDataService } from '../../../services/DataService';
import { ShoppingCart } from './ShoppingCart';

import { IProdukter,IProdukterList,IOrdrarList } from "../../../models/ISPList";

export interface IFunWebbshopState {
  addingNumber: number;
  ordrarList: IProdukterList[];
  viewList: boolean;
  productlist:IProdukter[];
}

export default class FunWebbshop extends React.Component<IFunWebShopProps, IFunWebbshopState> {
  constructor(props: IFunWebShopProps) {
    super(props);

    this.state = {
      productlist: this.props.produkterList,
      addingNumber: 0,
      ordrarList: [],
      viewList: false,
    };


  }

  /** Adding items to cart list */
  private _onClickToCart(id: number, imgUrl: string, imgDesc: string, pris: number) {
    const total = this.state.addingNumber;
    this.setState({
      addingNumber: total + 1,
      ordrarList: [...this.state.ordrarList, {
        Id: id, ImageUrl:
          { Url: imgUrl, Description: imgDesc },
        Price: pris
      }]
    });
  }

  /** Removing unwanted items from the cart */
  private _onClickRemoveFromCart(index: number) {
    const total = this.state.addingNumber;
    let array = [...this.state.ordrarList];
    array.splice(index, 1);

    this.setState({
      addingNumber: total - 1,
      ordrarList: array
    });
  }

  /** Adding the order lists in SharePoint list */
  private _onClickToOrdrarList() {
    this.props.SPDataUpdate(this.props.userId, this.state.ordrarList);
    this.setState({
      viewList: !this.state.viewList
    });
  }

  /** Toggle the cart list */
  private _showProdukterCartList() {
    if (this.state.ordrarList.length > 0) {
      this.setState({
        viewList: !this.state.viewList
      });
    }
  }

 /* private handleChange(id: number) {
    this.props.changeComplete(id)
      .then(updatedList => {
        this.setState({
          productlist: updatedList
        });
      });
  }*/
  public render(): React.ReactElement<IFunWebShopProps> {

    /*let listItems: JSX.Element[] = [];

    for(let i = 0; i < this.state.productlist.length; i++) {
      if(this.state.productlist[i]) {
        listItems.push(<li key={i} className={ styles.done }><input onChange={this.handleChange.bind(this, this.state.productlist[i].ID)} type="checkbox" defaultChecked /> {this.state.productlist[i].Title}</li>);
      }
      else {
        listItems.push(<li key={i}><input onChange={this.handleChange.bind(this, this.state.productlist[i].ID)} type="checkbox" /> {this.state.productlist[i].Title}</li>);
      }
    }*/
    //console.log("ordrarList: ", this.state.ordrarList);
    //console.log("produkterList: ", this.props.produkterList);
    return (
      <div className={styles.funWebShop}>
        <div className={styles.container}>
          <ProdukterCart addingNumber={this.state.addingNumber} cart1={this._showProdukterCartList.bind(this)}>
          </ProdukterCart>
          {
            (this.state.ordrarList.length != 0 && this.state.viewList) ?
              <ShoppingCart shoppingLists={this.state.ordrarList}
              ToRemoveFunction={this._onClickRemoveFromCart.bind(this)}
              closeOrdrarList={this._showProdukterCartList.bind(this)}
              shoppingListFunction={this._onClickToOrdrarList.bind(this)}></ShoppingCart>
              : null
          }
          <ProdukterItems produkterList={this.props.produkterList} cart={this._onClickToCart.bind(this)} >
          </ProdukterItems>
        </div>
      </div>
    );
  }
  }
