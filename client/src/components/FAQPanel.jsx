import React from 'react';

const FAQPanel = () => {
  const faqs = [
    {
      question: "What is a deepfake?",
      answer: "A deepfake is synthetic media where a person's likeness is replaced with someone else's using artificial intelligence."
    },
    {
      question: "How accurate is the detection?",
      answer: "Our detection system is highly effective but not 100% accurate. Very high-quality deepfakes may sometimes evade detection."
    },
    {
      question: "What types of media can I upload?",
      answer: "You can upload images (JPG, PNG, WebP) and videos (MP4, MOV, AVI) for analysis."
    },
    {
      question: "Is my uploaded media stored?",
      answer: "No, your media is processed temporarily and not stored on our servers."
    },
    {
      question: "Can I use this tool for commercial purposes?",
      answer: "This tool is for educational and informational purposes only."
    }
  ];

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="font-medium text-lg mb-1">{faq.question}</h3>
            <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPanel;
