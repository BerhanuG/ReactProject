import * as React from 'react';
import styles from './FunWebShop.module.scss';
import { IProdukter } from '../../../models/ISPList';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IProdukterItemsProps {
    produkterList: IProdukter[];    
    cart;
}

export default class ProdukterItems extends React.Component<IProdukterItemsProps, {}> {
    public render(): React.ReactElement<IProdukterItemsProps> {
        let items = this.props.produkterList.map((result) => {
            return <li className={styles.itemLiStyle} key={result.ID}>
                <img width={"150px"} height={"150px"} src={result.ECWS_x002e_ImageUrl.Url} />{<br></br>}
                {result.ECWS_x002e_ImageUrl.Description}{<br></br>}
                <span className={styles.price}><strong>{result.ECWS_x002e_Price}{' Kr'}</strong></span>
                {<DefaultButton className= {styles.cartButton} onClick={this.props.cart.bind(this, result.ID, result.ECWS_x002e_ImageUrl.Url,
                result.ECWS_x002e_ImageUrl.Description, result.ECWS_x002e_Price)}>ADD TO CART</DefaultButton>}{<br></br>}{<br></br>}
            </li>;
        });
        
        return (
            <div style={{background: 'white'}} className={styles.row}>
                <div style={{marginLeft: -42}}>
                    <ul style={{color: 'black'}}>
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}
