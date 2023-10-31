import React, { useState } from 'react';
import './faq.css';

function Faq() {
    const faqItems = [
        {
          question: 'What is our platform about?',
          answer: 'Our platform is a unique space for artisans and craft enthusiasts to connect, learn, collaborate, and showcase their art and craftwork.',
        },
        {
          question: 'How can I join as an artisan?',
          answer: 'To join as an artisan, create an account, set up your artisan profile, and start listing your virtual workshops and collaborative craft projects.',
        },
        {
          question: 'What if I\'m new to crafting?',
          answer: "No worries! Our platform caters to all skill levels. Start with beginner-friendly workshops, connect with artisans, and grow your craft skills.",
        },
       
         
          {
            question: 'Are there community discussions and sharing?',
            answer: 'Yes, we have vibrant crafting communities where you can connect with fellow enthusiasts, share your creations, and discuss your craft passions. Join in and be part of our creative community!',
          },
          {
            question: 'Do you offer workshops for kids or beginners?',
            answer: 'Yes, we have workshops tailored for kids and beginners. They\'re designed to be fun, educational, and beginner-friendly, making crafting enjoyable for everyone.',
          },
          {
            question: 'How can I showcase my own art and craftwork?',
            answer: 'You can create a gallery to showcase your completed art and craft pieces. It\'s a great platform to gain exposure and sell your work to a global audience of art and craft enthusiasts.',
          },
          {
            question: 'How do I become a verified artisan?',
            answer: 'To become a verified artisan, you can submit your credentials and a portfolio of your work. Our team will review your application and, once verified, you\'ll gain access to additional features and a "Verified Artisan" badge.',
          },
          {
            question: 'Is there a cost associated with using the platform?',
            answer: 'Signing up and browsing workshops and projects is free. However, there may be a fee for participating in certain workshops or projects. The cost varies depending on the artisan and the nature of the experience.',
          },
          {
            question: 'What happens if I need a refund for a workshop?',
            answer: 'If you need a refund for a workshop, please reach out to the artisan or workshop organizer. They will have their refund policy, and they\'ll be able to assist you with the refund process.',
          },
          {
            question: 'Can I connect with artisans outside of workshops?',
            answer: 'Yes, you can connect with artisans through their profiles and messaging. It\'s a great way to ask questions, discuss potential collaborations, or seek advice from artisans directly.',
          },
         
      ];
  const [activeItem, setActiveItem] = useState(null);

  const toggleItem = (index) => {
    if (index === activeItem) {
      setActiveItem(null); // Close the item if it's already open
    } else {
      setActiveItem(index); // Open the selected item
    }
  };

  const copyToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  return (
    <div className="faq-container">
      <h1 className="faqHeading">Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div key={index} className={`faq-item ${index === activeItem ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleItem(index)}>
              {item.question}
            </div>
            {index === activeItem && (
              <div>
                <div className="faq-answer">
                  {item.answer}
                  <button className="copy-button" style={{margnLeft: "5px"}} onClick={() => copyToClipboard(item.answer)}>
                    Copy!
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
