import * as React from 'react';
import styles from './FunWebShop.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export interface IProdukterCartProps {
    addingNumber: number;
    cart1: (event: React.MouseEvent<HTMLDivElement>) => void;     
}

const CartListStyle = {
        background: 'pink',
        color: '#606060',
        paddingTop: 0,
        paddingBottom: 0, 
        fontfamily: 'Gotham Narrow Bold",sans-serif',

       
};

export default class ProdukterCart extends React.Component<IProdukterCartProps, {}> {
    public render(): React.ReactElement<IProdukterCartProps> {        
        return (
            <div style={CartListStyle} className={styles.row}>
                <div style={{width: '95%', float: 'left'}}>
                    <h2>Barn Leksaker Web-Shop</h2>
                </div>
                <div style={{width: '5%', float: 'left', paddingTop: 12, cursor: 'pointer'}} onClick={this.props.cart1}>
                    <div><Icon iconName="Shop" className="ms-Shop" />{' '}{this.props.addingNumber}</div>
                    <div>CART</div>
                </div>
                <br style={{ clear: 'left' }} />
            </div>
        );
    }
}


