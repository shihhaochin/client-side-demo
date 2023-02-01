import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_03ly56n",
        "template_7kn8j0v",
        form.current,
        "rhQRhccpGOhyIsO3V"
      )
      .then((result) => {
        console.log(result.text);
        window.alert("已經傳訊息給網站作者");
      })
      .catch((error) => {
        console.log(error.text);
      });

    e.target.reset();
  };

  return (
    <div className="contactUsbg">
      <section className="contactUsContainer">
        <div className="contactUs">
          <p>Contact Us</p>

          <form action="" ref={form} onSubmit={sendEmail}>
            <input
              type="text"
              placeholder="Full Name"
              name="user_name"
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="user_email"
              required
            />
            <input type="text" placeholder="Subject" name="subject" required />
            <textarea name="message" placeholder="Message!"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
