import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Free and Open Source",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Teaser is free to host and is now fully open-source! I'm still studying
        at university but I want to work on Teaser with others in my spare time.
      </>
    ),
  },
  {
    title: "Made to Teach Others",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        I want to use this project to share my knowledge, to work
        collaboratively and to build a better social media platform. Maybe we
        can address the{" "}
        <a href="https://www.wired.com/story/tiktok-platforms-cory-doctorow/">
          enshittification
        </a>{" "}
        of TikTok?
      </>
    ),
  },
  {
    title: "Django Ninja and React Native",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        I'm using a pretty common and accessible stack for web developers. I
        hope the combination of strong documentation and powerful tools aids
        development.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
