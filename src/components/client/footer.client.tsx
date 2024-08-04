const footer = {
  logo: "DAINGUYEN",
  text: "All rights reserved.",
};

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        <span>{footer.logo}</span>
        <p className="text-slate-600">{footer.text}</p>
      </div>
    </footer>
  );
};

export default Footer;
