import * as React from 'react';
import { IProdukterList } from '../../../models/ISPList';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Button } from 'office-ui-fabric-react/lib/Button';
import styles from './FunWebShop.module.scss';


export type ToRemoveFunction = (index: number) => void;
export type ToOrderFunction = () => void;
export type ToShoppingFunction = () => void;
export type CallCloseFunction = () => void;

export interface IShoppingCartProps {
  shoppingLists: IProdukterList[];
  ToRemoveFunction: ToRemoveFunction;
  closeOrdrarList: CallCloseFunction;
  shoppingListFunction: ToShoppingFunction;
}

export class ShoppingCart extends React.Component<IShoppingCartProps, {}> {
  public render(): React.ReactElement<IShoppingCartProps> {
    return (
      <div style={{ position: 'relative', float: 'right' }}>
        <div className={styles.cartContainer}>
          {this.props.shoppingLists.map((shopItem: any, index: number) => (
            <div key={index} style={{ width: 300 }}>
              <div style={{ float: 'left', width: '30%' }} >
                <img width={"65px"} height={"65px"} src={shopItem.ImageUrl.Url} />
              </div>
              <div style={{ float: 'left', width: '60%' }}>
                <div>{shopItem.ImageUrl.Description}</div>
                <div style={{ paddingTop: 8 }}><strong>{shopItem.Price}{' Kr'}</strong>{' '}</div>
              </div>
              <div className={styles.deleteIcon} style={{ float: 'left', width: '10%', paddingTop: 27 }}>
                <Icon onClick={this._ToRemoveFunction.bind(this, index)} iconName="ChromeClose" id="icon" className="ms-ChromeClose" />
              </div>
              <br style={{ clear: 'left' }} />
              <hr />
            </div>
          ))
          }
          <br></br>
          <div style={{ float: 'right' }}>
            <Button style={{ width: '185x' ,backgroundColor: ''}} onClick={this._doPayment.bind(this)}>TO THE CASH</Button>{' '}
            <Button style={{ width: '135px' }} onClick={this._callCloseFunction}>CLOSE</Button>
          </div>
        </div>
      </div>
    );
  }

  private _ToRemoveFunction = (index: number): void => {
    this.props.ToRemoveFunction(index);
  }

  private _doPayment = (): void => {
    this.props.shoppingListFunction();
  }

  private _callCloseFunction = (): void => {
    this.props.closeOrdrarList();
  }
}
