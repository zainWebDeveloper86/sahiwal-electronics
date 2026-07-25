const FaqItem = ({ item, activeTab, toggleTab }) => {
  const isOpen = activeTab === item.id;

  const CloseIcon = () => (
    <svg className="h-6 w-6 text-voltage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const ArrowIcon = () => (
    <svg className="h-6 w-6 text-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <div className="border border-divider rounded-lg p-4 hover:border-voltage/40 transition-colors">
      <button
        className="flex items-center justify-between w-full"
        onClick={() => toggleTab(item.id)}
      >
        <span className="text-base font-body font-medium text-ink text-left">
          {item.question}
        </span>
        {isOpen ? <CloseIcon /> : <ArrowIcon />}
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-divider">
          <p className="text-sm font-body text-ink/60 leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default FaqItem;