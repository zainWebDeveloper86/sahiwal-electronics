import { useState } from "react";
import FaqItem from "./FaqItem";
import styles from "../../styles/styles";
import { faqData } from "../../static/faqData.js";
const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? 0 : tab);
  };

  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
      <div className="mx-auto space-y-4">
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
