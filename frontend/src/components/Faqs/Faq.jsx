import { useState } from "react";
import FaqItem from "./FaqItem.jsx";
import styles from "../../styles/styles.js";
import { faqData } from "../../static/faqData.js";

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? 0 : tab);
  };

  return (
    <div className={`${styles.section} my-8 max-w-3xl mx-auto`}>
      <h2 className="text-3xl font-display font-bold text-ink mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((item) => (
          <FaqItem
            key={item.id}
            item={item}
            activeTab={activeTab}
            toggleTab={toggleTab}
          />
        ))}
      </div>
    </div>
  );
};

export default Faq;
