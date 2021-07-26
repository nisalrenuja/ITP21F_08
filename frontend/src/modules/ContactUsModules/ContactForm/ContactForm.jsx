import React from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './ContactForm.css';
import emailjs from 'emailjs-com';
import ContactUsImg from '../../../assets/contactus/contactus.svg';

const sendEmail = (e) => {
  e.preventDefault();
  NotificationManager.info('Please wait..');
  emailjs.sendForm('service_504yqmn', 'template_9ine6vh', e.target, 'user_OkeRUw8xijd6xXRflprac').then(
    () => {
      NotificationManager.success('Email sent successfully');
      document.getElementById('myForm').reset();
    },
    () => {
      NotificationManager.warning('Something went wrong');
    },
  );
};

const ContactForm = () => (
  <div className="contactform-container">
    <NotificationContainer />
    <div className="container">
      <div className="row mt-3 mb-5">
        <h1 className="text-center display-6 contactform-title">Contact Us</h1>
        <div className="col-md-6">
          <img src={ContactUsImg} className="img-fluid" alt="contactImg" />
        </div>
        <div className="col-md-6">
          <div className="mt-5">
            <form id="myForm" onSubmit={sendEmail}>
              <div className="form-group mt-3">
                <label htmlFor="name" className="text-secondary">
                  Your Name
                </label>
                <input id="name" name="name" type="text" className="form-control" placeholder="Enter Your Name" />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="email" className="text-secondary">
                  Email address
                </label>
                <input id="email" name="email" type="email" className="form-control" placeholder="Enter Your Email" />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="message" className="text-secondary">
                  Message
                </label>
                <textarea id="message" name="message" className="form-control" placeholder="Enter Your Message" />
              </div>
              <div className="form-group mt-3">
                <button type="submit" className="contact-btn">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContactForm;
