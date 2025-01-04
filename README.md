# Forms-Gsheet-API-
# Full-Stack Form Builder for ACES (Association of Computer Engineering Students)

This repository contains the code for a fully functional **Form Builder Platform** for the **Association of Computer Engineering Students (ACES)**. The platform allows users to create, customize, and manage forms using an easy-to-use drag-and-drop builder. It integrates with **Google Sheets** to store form submissions, and provides an admin dashboard to manage and export form responses.

The platform is built using **React.js** for the front-end, **Node.js** for the back-end API integration, and utilizes **Google Sheets API** for storing form data. The website is fully responsive and visually aligned with the ACES branding, featuring a dark theme with golden accents inspired by the ACES logo.

## Role:
Full-stack Web Developer using BOLT AI to create a fully functional form builder platform for the Association of Computer Engineering Students (ACES).

## Objective:
Create a complete, working form builder website that allows users to:
- Create custom forms using a drag-and-drop builder.
- Customize the theme of the form (background, text, buttons, fonts).
- Preview the form before sharing.
- Store form submissions in **Google Sheets**.
- Admin dashboard to manage and export form responses.
- Send email notifications upon form submission.
- Ensure full data security and seamless user experience across all devices.

## Context:
The website is for the Association of Computer Engineering Students (ACES). The platform should reflect the club’s theme with a dark design and golden accents, inspired by the ACES logo (a falcon rising in gold). The form responses should be stored in Google Sheets, and the platform should be fully responsive and secure.

## Instructions:

1. **Implement a Drag-and-Drop Form Builder**  
   Create a form builder UI where users can add various fields like text input, radio buttons, checkboxes, dropdowns, etc. Provide customization options for each field such as:
   - Field label, placeholder text.
   - Required/optional toggle.
   - Validation rules (e.g., email format, number).
   - Default values for dropdowns or checkboxes.

2. **Add a Theme Customization Panel**  
   Add a theme customization panel allowing users to:
   - Choose the form's background color (light or dark).
   - Modify text color for labels, inputs, and headers.
   - Customize button styles (color, hover effects).
   - Change the font family and font size.

3. **Preview Mode**  
   Implement a preview mode where users can see how their form will appear to end-users before publishing.

4. **Google Sheets API Integration**  
   Use the **Google Sheets API** to store form submissions. Each form should have a unique Google Sheet or tab for responses. Use **OAuth2 authentication** to securely connect to Google Sheets.

5. **Admin Dashboard**  
   Build an admin dashboard with the following features:
   - View form responses in a table format.
   - Filter responses based on specific fields or date ranges.
   - Export data in CSV or Excel format.
   - Visualize data (charts for multiple-choice fields, summary stats).

6. **Email Notifications**  
   After a form submission:
   - Send a thank-you email to the user using **Nodemailer** or **SendGrid**.
   - Notify the admin with a detailed email containing the submission data.

7. **Data Security**  
   Ensure HTTPS encryption for all form data and secure storage of user responses. Use **OAuth2** for secure access to Google Sheets. Implement input validation and sanitization to prevent XSS, SQL injection, and other vulnerabilities.

8. **Responsive Design**  
   Use **CSS Flexbox** or **CSS Grid** for a dynamic layout that adapts to different screen sizes. Ensure the form builder and admin dashboard are mobile-friendly. Make sure the form builder and preview options are touch-friendly.

9. **Form Sharing & Editing**  
   Allow users to generate a unique URL to share their form. Users should be able to edit their form after publishing, with changes reflected in the same URL.

10. **Error Handling**  
   Implement clear error handling for:
   - Form validation errors (e.g., required fields, invalid email format).
   - Google Sheets API issues (e.g., API rate limits, authentication errors).
   - Email service issues (e.g., email failure).
   Display informative error messages to users with actionable solutions.

## Notes:
- Use **React.js** for the front-end to handle form creation, theme customization, and form preview.
- Use **Node.js** for API integration, including Google Sheets API and email notifications.
- **MongoDB** or **Firebase** can be used for user management and authentication (optional).
- The website should have a modern, sleek design that reflects the ACES club branding—dark theme with golden falcon accents.
- The platform should be scalable, able to handle a large number of forms and form submissions efficiently.

## Outcome:
A fully functional, responsive, and secure form builder platform that enables users to create forms, customize them, preview them, share them, and store responses in Google Sheets. Admins can manage responses via an easy-to-use dashboard, and email notifications are sent after each form submission. The platform ensures a seamless user experience across all devices and is built with security and scalability in mind.

## Setup and Installation:

1. Clone the repository:

```bash
git clone <repository_url>
cd <repository_directory>
