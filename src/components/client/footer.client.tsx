interface FooterSectionProps {
  logo: string;
  text: string;
}

const Footer: React.FC<FooterSectionProps> = ({ logo, text }) => {
  return (
    <footer className="bg-black pb-10 footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        <span>{logo}</span>
        <p className="text-slate-600 ml-5">{text}</p>
      </div>
    </footer>
  );
};

export default Footer;
