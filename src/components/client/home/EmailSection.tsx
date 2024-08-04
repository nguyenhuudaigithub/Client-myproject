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

const contact: ContactInfo = {
  title: "Let's Connect",
  detail:
    "I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
  socialMedia: [
    {
      name: "GitHub",
      image:
        "https://img.icons8.com/?size=100&id=OKQ59BZ2FQUg&format=png&color=000000",
      link: "https://img.icons8.com/?size=100&id=12599&format=png&color=000000",
    },
    {
      name: "LinkedIn",
      image:
        "https://img.icons8.com/?size=100&id=OKQ59BZ2FQUg&format=png&color=000000",
      link: "https://img.icons8.com/?size=100&id=13930&format=png&color=000000",
    },
    // Add more social media platforms here
  ],
};

const EmailSection: React.FC = () => {
  return (
    <section className="text-white py-8 px-4 xl:px-16">
      <h2 className="text-4xl font-bold mb-4">{contact.title}</h2>
      <p className="text-base lg:text-lg mb-8">{contact.detail}</p>
      <div className="flex gap-4">
        {contact.socialMedia.map((media) => (
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
