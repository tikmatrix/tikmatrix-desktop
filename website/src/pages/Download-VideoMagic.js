import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import './Download.css';

export default function Download() {
  return (
    <Layout
      title={translate({
        id: 'download.videomagic.title',
        message: 'Download VideoMagic',
        description: 'The title of the VideoMagic download page'
      })}
      description={translate({
        id: 'download.videomagic.description',
        message: 'Download VideoMagic for Windows, Mac and Linux',
        description: 'The description of the VideoMagic download page'
      })}>
      <main className="download-page">
        <div className="container">
          <div className="row">
            <div className="col col--12">
              <h1 className="download-title">
                <Translate
                  id="download.videomagic.title"
                  description="The title of the VideoMagic download page">
                  Download VideoMagic
                </Translate>
              </h1>
              <p className="download-subtitle">
                <Translate
                  id="download.videomagic.subtitle"
                  description="The subtitle of the VideoMagic download page">
                  Choose your platform to download VideoMagic
                </Translate>
              </p>
            </div>
          </div>

          <div className="row download-buttons">
            <div className="col col--4">
              <a href="https://api.niostack.com/front-api/download-windows?app=videomagic" className="download-card">
                <div className="platform-icon">
                  <i className="bx bxl-windows"></i>
                </div>
                <h3>
                  <Translate
                    id="download.windows.title"
                    description="Windows platform title">
                    Windows
                  </Translate>
                </h3>
                <p>
                  <Translate
                    id="download.windows.description"
                    description="Windows platform description">
                    Windows 10/11 (64-bit)
                  </Translate>
                </p>
                <div className="download-btn">
                  <Translate
                    id="download.windows.button"
                    description="Windows download button text">
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
                    id="download.mac.title"
                    description="Mac platform title">
                    Mac
                  </Translate>
                </h3>
                <p>
                  <Translate
                    id="download.mac.description"
                    description="Mac platform description">
                    macOS 10.15 or later
                  </Translate>
                </p>
                <a href="https://api.niostack.com/front-api/download-mac?app=videomagic" className="download-btn">
                  <Translate
                    id="download.mac.button"
                    description="Mac download button text">
                    Download for Mac
                  </Translate>
                </a>
                <p className="mac-install-tip">
                  <Translate
                    id="download.mac.install_tip"
                    description="Mac installation tip">
                    After installation, please run the following command in Terminal to allow the app to run:
                  </Translate>
                  <code>xattr -cr /Applications/VideoMagic.app</code>
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
                    id="download.linux.title"
                    description="Linux platform title">
                    Linux
                  </Translate>
                </h3>
                <p>
                  <Translate
                    id="download.linux.coming_soon"
                    description="Linux coming soon text">
                    Coming Soon
                  </Translate>
                </p>
                <div className="download-btn disabled">
                  <Translate
                    id="download.linux.development"
                    description="Linux under development text">
                    Under Development
                  </Translate>
                </div>
                <p className="coming-soon-text">
                  <Translate
                    id="download.linux.description"
                    description="Linux development description">
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
                  id="download.requirements.title"
                  description="System requirements title">
                  System Requirements
                </Translate>
              </h2>
              <ul>
                <li>
                  <Translate
                    id="download.requirements.os"
                    description="Operating system requirement">
                    Operating System: Windows 10/11, macOS 10.15+, or Ubuntu 20.04+
                  </Translate>
                </li>
                <li>
                  <Translate
                    id="download.requirements.processor"
                    description="Processor requirement">
                    Processor: Intel Core i5 or equivalent
                  </Translate>
                </li>
                <li>
                  <Translate
                    id="download.requirements.memory"
                    description="Memory requirement">
                    Memory: 8 GB RAM
                  </Translate>
                </li>
                <li>
                  <Translate
                    id="download.requirements.storage"
                    description="Storage requirement">
                    Storage: 500 MB available space
                  </Translate>
                </li>
                <li>
                  <Translate
                    id="download.requirements.internet"
                    description="Internet requirement">
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