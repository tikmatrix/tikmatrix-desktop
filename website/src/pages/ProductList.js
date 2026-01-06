import React from 'react';
import Layout from '@theme/Layout';
import styles from './ProductList.module.css';
import Translate, { translate } from '@docusaurus/Translate';

const products = [
    {
        id: 1,
        name: 'A4',
        description: translate({ message: 'The length and width are relatively small, but the height is high' }),
        model: 'N8,N9,N10,S8,S9+,S10,S20',
        price: '640$-1190$',
        imageUrl: '/img/A4.webp',
    },
    {
        id: 2,
        name: 'A6',
        description: translate({ message: 'The length and width are relatively big, but the height is low(2u size)' }),
        model: 'N8,N9,N10,S8,S9+,S10,S20',
        price: '700$-1250$',
        imageUrl: '/img/A6.webp',
    },
    {
        id: 3,
        name: 'AK',
        description: translate({ message: 'The length and width are relatively big, but the height is low(2u size)' }),
        model: 'N8,N9,N10,S8,S9+,S10,S20',
        price: '700$-1250$',
        imageUrl: '/img/AK.webp',
    },
    {
        id: 4,
        name: 'InActive SIM Card',
        description: translate({ message: 'US native non-activated Sim card,Used for tiktok android app to detect sim card location' }),
        model: 'T-Mobile',
        price: '5$/pre',
        imageUrl: '/img/tmobile.webp',
    },
];


function ProductList() {
    return (
        <Layout title={translate({ message: 'Buy hardware' })} description="The motherboard machine consists of 20 Samsung phone motherboards. It powers on automatically when connected to electricity, shares a unified power supply, has a unified multi-fan cooling system, and unified USB connectivity. It also supports OTG wired network connections.">
            <div className={styles.productTitle}>
                <Translate>The motherboard machine consists of 20 Samsung phone motherboards. It powers on automatically when connected to electricity, shares a unified power supply, has a unified multi-fan cooling system, and unified USB connectivity. It also supports OTG wired network connections.</Translate>
            </div>
            <div className={styles.productList}>
                {products.map(product => (
                    <div key={product.id} className={styles.product}>
                        <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p className={styles.productModel}>{product.model}</p>
                        <p className={styles.productPrice}>{product.price}</p>
                        <p className={styles.shipping}>
                            <Translate>Shipping worldwide</Translate>
                        </p>
                        <a href="//t.me/tikmatrix_agent_bot" className="get-started-btn" target='_blank'>
                            <Translate>Contact to purchase</Translate>
                        </a>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default ProductList;
