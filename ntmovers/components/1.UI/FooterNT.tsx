import React from 'react';

export const FooterNT = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
      <footer
          className="bg-[#7ABA78] w-full border-t border-t-foreground/10 p-3 flex flex-col items-center text-center text-2xl">
          <div>
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <p>Email: <a href="mailto:titusnekongo1379" className="text-blue-600">titusnekongo1379@gmail.com</a></p>
              <p>Phone: <a href="tel:+264814542958" className="text-blue-600">+26481 4542958</a></p>
              {/*<p>Address: 123 Moving Street, Windhoek, Namibia</p>*/}
          </div>
          <div className="text-medium mb-2">
              <p>Nelago Trading CC ©{currentYear} Designed and Developed by <a className="font-bold text-blue-600" href="https://frans-nekongo.com/">Frans Nekongo</a></p>
          </div>
      </footer>
  );
};