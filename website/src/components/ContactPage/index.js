import clsx from 'clsx';
import './index.css';
import Translate, { translate } from '@docusaurus/Translate';
const handleTagClick = (id) => {
    console.log(`Tag ${id} clicked`);
    //add className show to id
    document.getElementById(id).classList.toggle('show');
};
export default function FrequentlyAsked() {
    return (
        <section id="contact" className="contact">
            <div className="container" data-aos="fade-up">

                <div className="section-title">
                    <h2>
                        <Translate>Contact</Translate>
                    </h2>
                    <p>
                        <Translate>If you are interested in our service, please contact us to get price.</Translate>
                    </p>
                </div>

                <div className="row">
                    <div className="col col--12">
                        <div className="row">

                            <div className="col col--6 info">
                                <i className="bx bxl-telegram"></i>
                                <h4>
                                    <Translate>Telegram</Translate>
                                </h4>
                                <p>
                                    <a href="//t.me/tikmatrix_agent_bot" target="_blank">
                                        <Translate>Join Group</Translate>
                                    </a>
                                </p>
                            </div>

                            <div className="col col--6 info">
                                <i className="bx bx-envelope"></i>
                                <h4>
                                    <Translate>Email</Translate>
                                </h4>
                                <p>
                                    <Translate>support@tikmatrix.com</Translate>
                                </p>
                            </div>


                        </div>
                    </div>

                    {/* <div className="col col--6">
                        <form action="forms/contact.php" method="post" role="form" className="php-email-form" data-aos="fade-up">
                            <div className="form-group">
                                <input placeholder="Your Name" type="text" name="name" className="form-control" id="name" required />
                            </div>
                            <div className="form-group mt-3">
                                <input placeholder="Your Email" type="email" className="form-control" name="email" id="email" required />
                            </div>
                            <div className="form-group mt-3">
                                <input placeholder="Subject" type="text" className="form-control" name="subject" id="subject" required />
                            </div>
                            <div className="form-group mt-3">
                                <textarea placeholder="Message" className="form-control" name="message" rows="5" required></textarea>
                            </div>
                            <div className="my-3">
                                <div className="loading">Loading</div>
                                <div className="error-message"></div>
                                <div className="sent-message">Your message has been sent. Thank you!</div>
                            </div>
                            <div className="text-center"><button type="submit">Send Message</button></div>
                        </form>
                    </div> */}

                </div>

            </div>
        </section>
    );
}
