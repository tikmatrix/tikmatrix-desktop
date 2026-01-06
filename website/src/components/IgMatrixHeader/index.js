import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import './index.css';
import Heading from '@theme/Heading';
import Translate, { translate } from '@docusaurus/Translate';
import IgMatrixImageSlider from '../IgMatrixImageSlider';


export default function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();

    return (
        <header id="start" className='hero shadow--lw' >
            <div className="row header-row">
                <div className='col col--6 header-content'>
                    <Heading as="h1" className="hero__title">
                        <Translate>
                            Instagram Phone Farm Batch Control Tool
                        </Translate>
                    </Heading>
                    <p className="hero__subtitle">
                        <Translate>
                            Streamline your Instagram phone farm with advanced batch control and marketing automation
                        </Translate>
                    </p>
                    <div className="header-buttons">
                        <Link to="/Download-IgMatrix" className="download-btn">
                            <i className="bx bx-download"></i>
                            <Translate>
                                Download IgMatrix
                            </Translate>
                        </Link>



                    </div>
                </div>
                <div className="col col--6 image-slider">
                    <IgMatrixImageSlider />
                </div>
            </div>
        </header>
    );
}
