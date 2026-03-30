export const userWelcomeTemplate = (name: string) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
    <h2 style="color: #2563eb;">Welcome to Local Pankaj 🚀</h2>
    <p>Hello <strong>${name}</strong>,</p>
    <p>Your account has been successfully created. We're excited to have you on board!</p>
    <p>You can now book reliable home services in Jaipur with just a few clicks.</p>
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
      Best Regards,<br>Team Local Pankaj
    </div>
  </div>
`;

export const bookingTemplate = (data: any) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
    <h2 style="color: #1e40af;">Appointment Confirmed ✅</h2>
    <p>Great news! Your service appointment has been scheduled.</p>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 10px 0; color: #666;">Service:</td><td style="font-weight: bold;">${data.service}</td></tr>
      <tr><td style="padding: 10px 0; color: #666;">Date:</td><td style="font-weight: bold;">${data.date}</td></tr>
      <tr><td style="padding: 10px 0; color: #666;">Location:</td><td style="font-weight: bold;">${data.location}</td></tr>
      <tr><td style="padding: 10px 0; color: #666;">Status:</td><td style="color: #ca8a04; font-weight: bold;">Pending Assignment</td></tr>
    </table>
    <p style="margin-top: 20px;">Our team will assign a specialist to your request shortly.</p>
  </div>
`;

export const technicianTemplate = (data: any) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
    <h2 style="color: #2563eb;">Technician Assigned 👨‍🔧</h2>
    <p>Your expert for <strong>${data.service}</strong> is on the way!</p>
    <div style="background: #f8fafc; padding: 20px; border-radius: 15px;">
      <p style="margin: 0; font-size: 14px; color: #64748b;">Expert Name:</p>
      <p style="margin: 5px 0 15px 0; font-size: 18px; font-weight: bold;">${data.techName}</p>
      <p style="margin: 0; font-size: 14px; color: #64748b;">Contact Number:</p>
      <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: #2563eb;">${data.techPhone}</p>
    </div>
    <p style="margin-top: 20px; font-size: 14px; color: #666;">Scheduled Time: ${data.time} on ${data.date}</p>
  </div>
`;

export const completionTemplate = (data: any) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px; border-top: 4px solid #10b981;">
    <h2 style="color: #065f46;">Service Completed Successfully! ✅</h2>
    <p>Hello <strong>${data.name}</strong>,</p>
    <p>Your service request for <strong>${data.service}</strong> has been successfully fulfilled and marked as completed.</p>
    <div style="background: #f0fdf4; padding: 15px; border-radius: 10px; margin: 20px 0;">
      <p style="margin: 0; font-size: 13px; color: #166534;">Tracking ID:</p>
      <p style="margin: 5px 0 0 0; font-weight: bold; font-size: 16px;">${data.requestId}</p>
    </div>
    <p>Thank you for choosing Local Pankaj. We hope you are satisfied with our expert's work!</p>
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
      Team Local Pankaj<br>Jaipur
    </div>
  </div>
`;

export const adminTemplate = (data: any) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 20px; background: #fafafa;">
    <h2 style="color: #0f172a;">New Activity Alert 🔔</h2>
    <p style="font-size: 16px;">${data.message}</p>
    ${data.details ? `<div style="background: white; padding: 15px; border: 1px solid #ddd; border-radius: 10px; margin-top: 15px;">${data.details}</div>` : ""}
    <p style="margin-top: 20px; font-size: 12px; color: #999;">Triggered from: Strategic Command Engine</p>
  </div>
`;
