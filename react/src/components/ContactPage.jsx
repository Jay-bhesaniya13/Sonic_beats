import React from 'react';
import '../ContactPage.css'; // Ensure this points to your CSS file

const ContactPage = () => {
    return (
        <div className="contact-container">
            <div className="contact-row">
               <h1>Contact Us</h1>
            </div>
            <div className="contact-row">
                <h4 style={{ textAlign: 'center' }}>We'd love to hear from you!</h4>
            </div>
            <div className="contact-row input-container">
                <div className="contact-col-xs-12">
                    <div className="styled-input wide">
                        <input type="text" required />
                        <label>Name</label>
                    </div>
                </div>
                <div className="contact-col-md-6 contact-col-sm-12">
                    <div className="styled-input">
                        <input type="text" required />
                        <label>Email</label>
                    </div>
                </div>
                <div className="contact-col-md-6 contact-col-sm-12">
                    <div className="styled-input" style={{ float: 'right' }}>
                        <input type="text" required />
                        <label>Phone Number</label>
                    </div>
                </div>
                <div className="contact-col-xs-12">
                    <div className="styled-input wide">
                        <textarea required></textarea>
                        <label>Message</label>
                    </div>
                </div>
                <div className="contact-col-xs-12">
                    <div className="btn-lrg submit-btn">Send Message</div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
