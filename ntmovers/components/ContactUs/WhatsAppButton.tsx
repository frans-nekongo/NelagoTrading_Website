// components/WhatsAppButton.js
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const WHATSAPP_NUMBER = '264817173244';
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20there!`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        backgroundColor: '#25D366',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      <FaWhatsapp color="white" size={30} />
    </a>
  );
};

export default WhatsAppButton;