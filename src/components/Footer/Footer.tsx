// components/Footer.js

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-8">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Game Search. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
