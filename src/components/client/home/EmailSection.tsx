import React from "react";

// Define types for social media items
interface SocialMedia {
  name: string;
  image: string;
  link: string;
}

// Define types for the contact section
interface ContactInfo {
  title: string;
  detail: string;
  socialMedia: SocialMedia[];
}

const EmailSection: React.FC<ContactInfo> = ({
  title,
  detail,
  socialMedia,
}) => {
  console.log(title);
  console.log(detail);
  console.log(socialMedia);

  return (
    <section className="text-white py-8 px-4 xl:px-16">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="text-base lg:text-lg mb-8">{detail}</p>
      <div className="flex gap-4">
        {socialMedia.map((media) => (
          <a
            key={media.name}
            href={media.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <img
              src={media.image}
              alt={media.name}
              width={40}
              height={40}
              className="mr-2"
            />
            <span>{media.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default EmailSection;
