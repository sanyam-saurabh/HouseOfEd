const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>© {new Date().getFullYear()} Saurabh Sanyam Jaiswal</p>
        <p>
          <a
            href="https://github.com/sanyam-saurabh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub
          </a>{" "}
          |{" "}
          <a
            href="https://www.linkedin.com/in/sanyam-saurabh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            LinkedIn
          </a>
        </p>
      </footer>
    );
  };
  
  export default Footer;
  