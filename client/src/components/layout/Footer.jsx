// import React from "react";
// import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
// import { Link } from "react-router-dom";
// import { HashLink } from "react-router-hash-link";

// const Footer = () => {
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <footer id="contact" className="bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Main Footer Content */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
//           {/* Company Info */}
//           <div className="space-y-4">
//             <img src="/logo2.svg" alt="logo" className="w-16" />
//             <p className="text-gray-400">
//               Social media analytics and automation platform powered by AI
//             </p>
//             <div className="flex gap-4">
//               <a
//                 href="https://github.com/sandipto729/SocialMedia_Langflow"
//                 className="text-gray-400 hover:text-white transition-colors">
//                 <Github size={20} />
//               </a>
//               {/* <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition-colors">
//                 <Linkedin size={20} />
//               </a> */}
//               <a
//                 href="mailto:sr.23cs8002@nitdgp.ac.in"
//                 className="text-gray-400 hover:text-white transition-colors">
//                 <Mail size={20} />
//               </a>

//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold">Quick Links</h4>
//             <div className="flex flex-col gap-2">
//               <HashLink smooth to={"/#features"} onClick={scrollToTop}>
//                 <button className="text-gray-400 hover:text-white transition-colors text-left">
//                   Features
//                 </button>
//               </HashLink>
//               <HashLink smooth to={"/#team"} onClick={scrollToTop}>
//                 <button className="text-gray-400 hover:text-white transition-colors text-left">
//                   Team
//                 </button>
//               </HashLink>

//               <Link to={"/dashboard"} onClick={scrollToTop}>
//                 <button className="text-gray-400 hover:text-white transition-colors text-left">
//                   Get Started
//                 </button>
//               </Link>
//             </div>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold">Contact</h4>
//             <div className="space-y-2 text-gray-400">
//               <p>Email: sr.23cs8002@nitdgp.ac.in</p>
//               <p>NIT Durgapur,Durgapur,WB</p>
//             </div>
//           </div>

//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-gray-400 text-center md:text-left">
//             © 2024 Insightly. All rights reserved.
//           </p>
//           <div className="flex gap-6 text-gray-400">
//             <a href="#" className="hover:text-white transition-colors">
//               Privacy Policy
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               Terms of Service
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Scroll to Top Button */}
//       <button
//         onClick={scrollToTop}
//         className="fixed bottom-8 right-8 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors">
//         <ArrowUp size={24} />
//       </button>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import styles from './style/footer.module.scss';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email === '') {
      toast.error('Please enter your email');
    } else {
      toast.success(`${email} Subscribed successfully`);
    }
  };

  return (
    <div className={`${styles.container} dark-theme`}>
      <div className={styles.leftContainer}>
        <div className={styles.grid}>
          <img
            src="https://social-media-langflow.vercel.app/404%20Found%20Logo.jpeg"
            alt="Logo"
            className={styles.logo}
          />
          <p className={styles.description}>
            Social media analytics and automation platform powered by AI
          </p>
          <div className={styles.socials}>
            <a
              href="https://github.com/sandipto729/SocialMedia_Langflow"
              className={styles.iconLink}
            >
              <Github size={24} />
            </a>
            <a href="mailto:sr.23cs8002@nitdgp.ac.in" className={styles.iconLink}>
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className={styles.grid}>
          <h4 className={styles.gridTitle}>Quick Links</h4>
          <div className={styles.gridLinks}>
            <HashLink smooth to="/#features">
              <button className={styles.linkButton}>Features</button>
            </HashLink>
            <HashLink smooth to="/#team">
              <button className={styles.linkButton}>Team</button>
            </HashLink>
            <Link to="/dashboard">
              <button className={styles.linkButton}>Get Started</button>
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          <h4 className={styles.gridTitle}>Contact</h4>
          <div className={styles.gridContact}>
          <p>Email: <a href="mailto:sr.23cs8002@nitdgp.ac.in">sr.23cs8002@nitdgp.ac.in</a></p>

            <p>NIT Durgapur, Durgapur, WB</p>
          </div>
        </div>
      </div>

      <div className={styles.rightContainer}>
        <p className={styles.subscribeText}>Subscribe to our newsletter</p>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter your email address"
            className={styles.inputField}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.subscribeButton} onClick={handleSubmit}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
