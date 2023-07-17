const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-4 text-center">
            <p className="text-sm text-gray-600">
                &copy; {currentYear} Your Website. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
