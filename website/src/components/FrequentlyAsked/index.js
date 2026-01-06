import clsx from 'clsx';
import './index.css';
import Translate, { translate } from '@docusaurus/Translate';
const handleTagClick = (id) => {
    console.log(`Tag ${id} clicked`);
    //add class show to id
    document.getElementById(id).classList.toggle('show');
};
export default function FrequentlyAsked() {
    return (
        <section id="faq" className="faq section-bg">
            <div className="container" data-aos="fade-up">

                <div className="section-title">
                    <h2>
                        <Translate>Frequently Asked Questions</Translate>
                    </h2>
                    <p>
                        <Translate>Here are some frequently asked questions.</Translate>
                    </p>
                </div>

                <div className="accordion-list">
                    <ul>
                        <li data-aos="fade-up">
                            <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" className="collapse"
                                onClick={() => handleTagClick("accordion-list-1")}
                                data-bs-target="#accordion-list-1">
                                <Translate>What is TikMatrix?</Translate>
                                <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                            <div id="accordion-list-1" className="collapse show" data-bs-parent=".accordion-list">
                                <p>
                                    <Translate>TikMatrix is a professional marketing software designed for TikTok phone farms</Translate>
                                </p>
                            </div>
                        </li>

                        <li data-aos="fade-up" data-aos-delay="100">
                            <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#accordion-list-2"
                                onClick={() => handleTagClick("accordion-list-2")}
                                className="collapsed">
                                <Translate>How to use?</Translate>
                                <i className="bx bx-chevron-down icon-show"></i><i
                                    className="bx bx-chevron-up icon-close"></i></a>
                            <div id="accordion-list-2" className="collapse" data-bs-parent=".accordion-list">
                                <p>
                                    <Translate>Go to the "Download" page and download the latest version of TikMatrix.</Translate>
                                </p>
                            </div>
                        </li>

                        <li data-aos="fade-up" data-aos-delay="200">
                            <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#accordion-list-3"
                                onClick={() => handleTagClick("accordion-list-3")}
                                className="collapsed">
                                <Translate>What devices can I use?</Translate>
                                <i className="bx bx-chevron-down icon-show"></i><i
                                    className="bx bx-chevron-up icon-close"></i></a>
                            <div id="accordion-list-3" className="collapse" data-bs-parent=".accordion-list">
                                <p>
                                    <Translate>TikMatrix supports Android phones running Android 5.0 and above.</Translate>
                                </p>
                            </div>
                        </li>

                        <li data-aos="fade-up" data-aos-delay="300">
                            <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#accordion-list-4"
                                onClick={() => handleTagClick("accordion-list-4")}
                                className="collapsed">
                                <Translate>How many devices can I manage?</Translate>
                                <i className="bx bx-chevron-down icon-show"></i><i
                                    className="bx bx-chevron-up icon-close"></i></a>
                            <div id="accordion-list-4" className="collapse" data-bs-parent=".accordion-list">
                                <p>
                                    <Translate>TikMatrix supports up to 200+ devices.</Translate>
                                </p>
                            </div>
                        </li>
                        <li data-aos="fade-up" data-aos-delay="300">
                            <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#accordion-list-5"
                                onClick={() => handleTagClick("accordion-list-5")}
                                className="collapsed">
                                <Translate>How many TikTok accounts can each phone log into?</Translate>
                                <i className="bx bx-chevron-down icon-show"></i><i
                                    className="bx bx-chevron-up icon-close"></i></a>
                            <div id="accordion-list-5" className="collapse" data-bs-parent=".accordion-list">
                                <p>
                                    <Translate>TikMatrix supports 8 TikTok accounts on each phone.</Translate>
                                </p>
                            </div>
                        </li>

                        <li data-aos="fade-up" data-aos-delay="400">
                            <i className="bx bx-help-circle icon-help"></i>
                            <a data-bs-toggle="collapse" data-bs-target="#accordion-list-6" onClick={() => handleTagClick("accordion-list-6")}
                                className="collapsed">
                                <Translate>What computer can I use?</Translate><i className="bx bx-chevron-down icon-show"></i><i
                                    className="bx bx-chevron-up icon-close"></i></a>
                            <div id="accordion-list-6" className="collapse" data-bs-parent=".accordion-list">
                                <p>
                                    <Translate>TikMatrix supports Windows 10 and above, and macOS 10.15 or later. For Mac users, after installation, you need to run the following command in Terminal to allow the app to run: xattr -cr /Applications/TikMatrix.app</Translate>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
