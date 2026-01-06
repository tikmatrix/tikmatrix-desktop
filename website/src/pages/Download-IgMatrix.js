import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import './Download.css';

export default function Download() {
  const [downloadUrls, setDownloadUrls] = useState({
    windows: 'https://api.niostack.com/front-api/download-windows?app=igmatrix',
    mac: 'https://api.niostack.com/front-api/download-mac?app=igmatrix'
  });

  useEffect(() => {
    // 从URL中获取distributor参数
    const urlParams = new URLSearchParams(window.location.search);
    const distributor = urlParams.get('distributor');

    if (distributor) {
      setDownloadUrls({
        windows: `https://api.niostack.com/front-api/download-windows?app=igmatrix&distributor=${distributor}`,
        mac: `https://api.niostack.com/front-api/download-mac?app=igmatrix&distributor=${distributor}`
      });
    }
  }, []);

  return (
    <Layout
      title={translate({
        id: 'download.igmatrix.title',
        message: 'Download IgMatrix',
        description: 'The title of the IgMatrix download page'
      })}
      description={translate({
        id: 'download.igmatrix.description',
        message: 'Download IgMatrix for Windows, Mac and Linux',
        description: 'The description of the IgMatrix download page'
      })}>
      <main className="download-page">
        <div className="container">
          <div className="row">
            <div className="col col--12">
              <h1 className="download-title">
                <Translate
                  id="download.igmatrix.title"
                  description="The title of the IgMatrix download page">
                  Download IgMatrix
                </Translate>
              </h1>
              <p className="download-subtitle">
                <Translate
                  id="download.igmatrix.subtitle"
                  description="The subtitle of the IgMatrix download page">
                  Choose your platform to download IgMatrix
                </Translate>
              </p>
            </div>
          </div>

          <div className="row download-buttons">
            <div className="col col--4">
              <a href={downloadUrls.windows} className="download-card">
                <div className="platform-icon">
                  <i className="bx bxl-windows"></i>
                </div>
                <h3>
                  <Translate
                    id="download.igmatrix.windows.title"
                    description="Windows platform title for IgMatrix">
                    Windows
                  </Translate>
                </h3>
                <p>
                  <Translate
                    id="download.igmatrix.windows.description"
                    description="Windows platform description for IgMatrix">
                    Windows 10/11 (64-bit)
                  </Translate>
                </p>
                <div className="download-btn">
                  <Translate
                    id="download.igmatrix.windows.button"
                    description="Windows download button text for IgMatrix">
                    Download for Windows
                  </Translate>
                </div>
              </a>
            </div>

            <div className="col col--4">
              <div className="download-card mac-card">
                <div className="platform-icon">
                  <i className="bx bxl-apple"></i>
                </div>
                <h3>
                  <Translate
                    id="download.igmatrix.mac.title"
                    description="Mac platform title for IgMatrix">
                    Mac
                  </Translate>
                </h3>
                <p>
                  <Translate
                    id="download.igmatrix.mac.description"
                    description="Mac platform description for IgMatrix">
                    macOS 10.15 or later
                  </Translate>
                </p>
                <a href={downloadUrls.mac} className="download-btn">
                  <Translate
                    id="download.igmatrix.mac.button"
                    description="Mac download button text for IgMatrix">
                    Download for Mac
                  </Translate>
                </a>
                <p className="mac-install-tip">
                  <Translate
                    id="download.igmatrix.mac.install_tip"
                    description="Mac installation tip for IgMatrix">
                    After installation, please run the following command in Terminal to allow the app to run:
                  </Translate>
                  <code>xattr -cr /Applications/IgMatrix.app</code>
                </p>
              </div>
            </div>

            <div className="col col--4">
              <div className="download-card linux-card">
                <div className="platform-icon">
                  <i className="bx bxl-tux"></i>
                </div>
                <h3>
                  <Translate
                    id="download.igmatrix.linux.title"
                    description="Linux platform title for IgMatrix">
                    Linux
                  </Translate>
                </h3>
                <p>
                  <Translate
                    id="download.igmatrix.linux.coming_soon"
                    description="Linux coming soon text for IgMatrix">
                    Coming Soon
                  </Translate>
                </p>
                <div className="download-btn disabled">
                  <Translate
                    id="download.igmatrix.linux.development"
                    description="Linux under development text for IgMatrix">
                    Under Development
                  </Translate>
                </div>
                <p className="coming-soon-text">
                  <Translate
                    id="download.igmatrix.linux.description"
                    description="Linux development description for IgMatrix">
                    Linux version is currently under development
                  </Translate>
                </p>
              </div>
            </div>
          </div>

          <div className="row system-requirements">
            <div className="col col--12">
              <h2>
                <Translate
                  id="download.igmatrix.requirements.title"
                  description="System requirements title for IgMatrix">
                  System Requirements
                </Translate>
              </h2>
              <ul>
                <li>
                  <Translate
                    id="download.igmatrix.requirements.os"
                    description="Operating system requirement for IgMatrix">
                    Operating System: Windows 10/11, macOS 10.15+, or Ubuntu 20.04+
                  </Translate>
                </li>
                <li>
                  <Translate
                    id="download.igmatrix.requirements.processor"
                    description="Processor requirement for IgMatrix">
                    Processor: Intel Core i5 or equivalent
                  </Translate>
                </li>
                <li>
                  <Translate
                    id="download.igmatrix.requirements.memory"
                    description="Memory requirement for IgMatrix">
                    Memory: 8 GB RAM
                  </Translate>
                </li>
                <li>
                  <Translate
                    id="download.igmatrix.requirements.storage"
                    description="Storage requirement for IgMatrix">
                    Storage: 500 MB available space
                  </Translate>
                </li>
                <li>
                  <Translate
                    id="download.igmatrix.requirements.internet"
                    description="Internet requirement for IgMatrix">
                    Internet Connection: Required
                  </Translate>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 