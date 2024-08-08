// components/EmailButton.js
import {FaEnvelope} from 'react-icons/fa';

const EmailButton = () => {
    const EMAIL_ADDRESS = 'fransnekongoo@gmail.com';
    return (
    <a
      href={`mailto:${EMAIL_ADDRESS}?subject=Hello%20there!&body=I%20would%20like%20to%20get%20in%20touch.`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        backgroundColor: '#007BFF',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      <FaEnvelope color="white" size={30} />
    </a>
  );
};

export default EmailButton;