import React, { useEffect, useRef } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import './styles.css';

// Technical Points data
const TECH_POINTS = [
    {
        id: 'realTouch',
        icon: 'bx-fingerprint',
        title: translate({ id: 'tech.point.realTouch.title', message: 'Real Touch Injection' }),
        desc: translate({ id: 'tech.point.realTouch.desc', message: 'Injects authentic touch events at the Android input layer, indistinguishable from human interaction.' }),
        bullets: [
            translate({ id: 'tech.point.realTouch.b1', message: 'Hardware-level touch signal generation' }),
            translate({ id: 'tech.point.realTouch.b2', message: 'Pressure and velocity randomization' }),
            translate({ id: 'tech.point.realTouch.b3', message: 'Arc trajectory simulation' }),
        ],
    },
    {
        id: 'zeroApi',
        icon: 'bx-block',
        title: translate({ id: 'tech.point.zeroApi.title', message: 'Zero API Automation' }),
        desc: translate({ id: 'tech.point.zeroApi.desc', message: 'No TikTok API calls, no network interception. All operations occur at the UI layer.' }),
        bullets: [
            translate({ id: 'tech.point.zeroApi.b1', message: 'No API token exposure' }),
            translate({ id: 'tech.point.zeroApi.b2', message: 'No request signature spoofing' }),
            translate({ id: 'tech.point.zeroApi.b3', message: 'Immune to API rate limiting' }),
        ],
    },
    {
        id: 'humanBehavior',
        icon: 'bx-body',
        title: translate({ id: 'tech.point.humanBehavior.title', message: 'Human-like Behavior Model' }),
        desc: translate({ id: 'tech.point.humanBehavior.desc', message: 'Behavior patterns derived from real user data, avoiding detectable automation signatures.' }),
        bullets: [
            translate({ id: 'tech.point.humanBehavior.b1', message: 'Randomized timing intervals' }),
            translate({ id: 'tech.point.humanBehavior.b2', message: 'Natural scroll velocity curves' }),
            translate({ id: 'tech.point.humanBehavior.b3', message: 'Session duration modeling' }),
        ],
    },
    {
        id: 'localExec',
        icon: 'bx-terminal',
        title: translate({ id: 'tech.point.localExec.title', message: 'Local Execution Sandbox' }),
        desc: translate({ id: 'tech.point.localExec.desc', message: 'Scripts execute on your local machine via ADB—no cloud relay, no third-party servers.' }),
        bullets: [
            translate({ id: 'tech.point.localExec.b1', message: 'No remote execution dependencies' }),
            translate({ id: 'tech.point.localExec.b2', message: 'Full data privacy' }),
            translate({ id: 'tech.point.localExec.b3', message: 'Air-gapped deployment option' }),
        ],
    },
    {
        id: 'fingerprint',
        icon: 'bx-devices',
        title: translate({ id: 'tech.point.fingerprint.title', message: 'Device Fingerprint Isolation' }),
        desc: translate({ id: 'tech.point.fingerprint.desc', message: 'Each device maintains unique hardware and software fingerprints, no cross-contamination.' }),
        bullets: [
            translate({ id: 'tech.point.fingerprint.b1', message: 'Unique IMEI / Android ID per device' }),
            translate({ id: 'tech.point.fingerprint.b2', message: 'Isolated IP via proxy assignment' }),
            translate({ id: 'tech.point.fingerprint.b3', message: 'No shared cookies or tokens' }),
        ],
    },
    {
        id: 'passiveCapture',
        icon: 'bx-scan',
        title: translate({ id: 'tech.point.passiveCapture.title', message: 'Passive Capture Mode' }),
        desc: translate({ id: 'tech.point.passiveCapture.desc', message: 'Screen data extracted via OCR and computer vision—no in-app hooks or memory injection.' }),
        bullets: [
            translate({ id: 'tech.point.passiveCapture.b1', message: 'Zero code injection into TikTok' }),
            translate({ id: 'tech.point.passiveCapture.b2', message: 'Read-only screen capture' }),
            translate({ id: 'tech.point.passiveCapture.b3', message: 'Compatible with any app version' }),
        ],
    },
];

// Security grades data
const SECURITY_GRADES = [
    { id: 'zeroApi', label: translate({ id: 'tech.security.zeroApi', message: 'Zero-API Operation' }), grade: 'A', percent: 95 },
    { id: 'noHook', label: translate({ id: 'tech.security.noHook', message: 'No Injection / No Hook' }), grade: 'A', percent: 95 },
    { id: 'realDevice', label: translate({ id: 'tech.security.realDevice', message: 'Real Device Environment' }), grade: 'A', percent: 90 },
    { id: 'humanModel', label: translate({ id: 'tech.security.humanModel', message: 'Human-like Behavior Model' }), grade: 'B', percent: 80 },
    { id: 'noiseCurve', label: translate({ id: 'tech.security.noiseCurve', message: 'Behavior Noise Curve' }), grade: 'B', percent: 75 },
    { id: 'proxyIsolation', label: translate({ id: 'tech.security.proxyIsolation', message: 'Optional Proxy Isolation' }), grade: 'C', percent: 60 },
];

export default function TechnicalAdvantages() {
    const diagramRef = useRef(null);
    const gradeRefs = useRef([]);

    useEffect(() => {
        // Animate security grade bars on scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.2 }
        );

        gradeRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="techAdvantages" id="technical-advantages">
            <div className="container">
                {/* Section Header */}
                <div className="techHeader" data-aos="fade-up">
                    <h2 className="techTitle">
                        <Translate id="tech.title">Technical Advantages</Translate>
                    </h2>
                    <p className="techSubtitle">
                        <Translate id="tech.subtitle">
                            Anti-detection architecture built on real-device automation principles
                        </Translate>
                    </p>
                </div>

                {/* Section 1: Tech Diagram */}
                <div className="techDiagram" ref={diagramRef} data-aos="fade-up" data-aos-delay="100">
                    <div className="diagramWrapper">
                        <div className="diagramNode nodeUser">
                            <div className="nodeIcon"><i className="bx bx-user"></i></div>
                            <span className="nodeLabel">{translate({ id: 'tech.diagram.user', message: 'User' })}</span>
                        </div>

                        <div className="diagramLine line1">
                            <span className="lineTag">{translate({ id: 'tech.diagram.localExecution', message: 'Local Execution' })}</span>
                        </div>

                        <div className="diagramNode nodeEngine">
                            <div className="nodeIcon"><i className="bx bx-chip"></i></div>
                            <span className="nodeLabel">{translate({ id: 'tech.diagram.engine', message: 'TikMatrix Engine' })}</span>
                        </div>

                        <div className="diagramLine line2">
                            <span className="lineTag">{translate({ id: 'tech.diagram.realTouch', message: 'Real Touch Injection' })}</span>
                        </div>

                        <div className="diagramNode nodeDevices">
                            <div className="nodeIcon"><i className="bx bx-mobile-alt"></i></div>
                            <span className="nodeLabel">{translate({ id: 'tech.diagram.devices', message: 'Real Android Devices' })}</span>
                        </div>

                        <div className="diagramLine line3">
                            <span className="lineTag">{translate({ id: 'tech.diagram.noApi', message: 'No API Calls' })}</span>
                        </div>

                        <div className="diagramNode nodeTikTok">
                            <div className="nodeIcon"><i className="bx bxl-tiktok"></i></div>
                            <span className="nodeLabel">{translate({ id: 'tech.diagram.tiktok', message: 'TikTok App' })}</span>
                        </div>
                    </div>

                    <div className="diagramTags">
                        <span className="tagItem"><i className="bx bx-check-shield"></i> {translate({ id: 'tech.diagram.fingerprintIsolation', message: 'Device Fingerprint Isolation' })}</span>
                        <span className="tagItem"><i className="bx bx-lock-alt"></i> {translate({ id: 'tech.diagram.noMemoryInjection', message: 'No Memory Injection' })}</span>
                        <span className="tagItem"><i className="bx bx-cloud"></i> {translate({ id: 'tech.diagram.zeroCloud', message: 'Zero Cloud Dependency' })}</span>
                    </div>
                </div>

                {/* Section 2: Technical Points (Two-column doc style) */}
                <div className="techPoints" data-aos="fade-up" data-aos-delay="200">
                    <h3 className="sectionSubhead">
                        <Translate id="tech.points.heading">Core Technical Implementation</Translate>
                    </h3>
                    <div className="pointsGrid">
                        {TECH_POINTS.map((point, idx) => (
                            <article
                                className="techPoint"
                                key={point.id}
                                data-aos="fade-up"
                                data-aos-delay={100 + idx * 50}
                            >
                                <div className="pointIcon">
                                    <i className={`bx ${point.icon}`}></i>
                                </div>
                                <div className="pointContent">
                                    <h4 className="pointTitle">{point.title}</h4>
                                    <p className="pointDesc">{point.desc}</p>
                                    <ul className="pointBullets">
                                        {point.bullets.map((b, i) => (
                                            <li key={i}><i className="bx bx-chevron-right"></i>{b}</li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Section 3: Security Grade Chart */}
                <div className="securityChart" data-aos="fade-up" data-aos-delay="300">
                    <h3 className="sectionSubhead">
                        <Translate id="tech.security.heading">Security Grade Assessment</Translate>
                    </h3>
                    <div className="gradeList">
                        {SECURITY_GRADES.map((item, idx) => (
                            <div
                                className="gradeRow"
                                key={item.id}
                                ref={(el) => (gradeRefs.current[idx] = el)}
                            >
                                <div className="gradeLabel">{item.label}</div>
                                <div className="gradeBarWrapper">
                                    <div
                                        className={`gradeBar grade${item.grade}`}
                                        style={{ '--target-width': `${item.percent}%` }}
                                    ></div>
                                </div>
                                <div className={`gradeBadge badge${item.grade}`}>{item.grade}</div>
                            </div>
                        ))}
                    </div>
                    <div className="gradeLegend">
                        <span className="legendItem legendA">A = <Translate id="tech.security.legendA">Excellent</Translate></span>
                        <span className="legendItem legendB">B = <Translate id="tech.security.legendB">Good</Translate></span>
                        <span className="legendItem legendC">C = <Translate id="tech.security.legendC">Optional</Translate></span>
                    </div>
                </div>
            </div>
        </section>
    );
}
