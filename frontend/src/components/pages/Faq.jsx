
const Faq = () => {
  const faqData = [
    {
      question: 'What are your working hours?',
      answer: 'Our garage is open from Monday to Friday, 9:00 AM to 6:00 PM, and on Saturdays from 10:00 AM to 4:00 PM.',
    },
    {
      question: 'Do you offer emergency services?',
      answer: 'Yes, we provide emergency services. If you need immediate assistance, please call our emergency hotline at (123) 456-7890.',
    },
    {
      question: 'How can I schedule an appointment?',
      answer: 'You can schedule an appointment by calling our office during working hours or using our online appointment booking system on our website.',
    },
    {
      question: 'What types of payment do you accept?',
      answer: 'We accept cash, credit cards, and online payment methods. Payment is due upon completion of service.',
    },
    {
      question: 'Do you offer any discounts or promotions?',
      answer: 'Yes, we frequently run promotions and discounts. Check our website or contact us for the latest offers.',
    },
  ];

  return (
    <div className="container p-md-5">
      <h2 className="mt-4 text-center ">Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">
        {faqData.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`faqHeading${index}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#faqCollapse${index}`}
                aria-expanded="true"
                aria-controls={`faqCollapse${index}`}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`faqCollapse${index}`}
              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
              aria-labelledby={`faqHeading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
