package com.vita.service.impl;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.vita.model.User;
import com.vita.repositoty.UserRepository;
import com.vita.service.EmailService;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UserRepository userRepo;

    @Value("${spring.mail.username}")
    private String fromEmailId;

    @Override
    public String loginEmail(String toEmailId, String subject, String body) {
        User user = userRepo.findByEmail(toEmailId);
        if (user == null) {
            return "User not found for email: " + toEmailId;
        }

        String emailBody = body + "\n\nUser ID: " + user.getUsername() + "\nPassword: " + user.getPassword();

        SimpleMailMessage smm = new SimpleMailMessage();
        smm.setFrom(fromEmailId);
        smm.setTo(user.getEmail());
        smm.setSubject(subject);
        smm.setText(emailBody);

        javaMailSender.send(smm);

        return "Email sent successfully";
    }

    public String invoiceEmail(String toEmailId, String subject, String body, String path) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;
        
        try {
            helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(toEmailId);
            helper.setSubject(subject);
            helper.setText(body);
            
            // Log the attachment path for debugging
            System.out.println("Path for attachment: " + path);
            
            File attachment = new File(path);
            
            // Check if the file exists and is not null
            if (attachment != null && attachment.exists()) {
                helper.addAttachment(attachment.getName(), attachment);
            } else {
                // Log an error and return a message if the file doesn't exist
                System.err.println("Attachment file does not exist at path: " + path);
                return "Attachment file does not exist";
            }
        } catch (Exception e) {
            // Print the stack trace and return a message if an error occurs
            e.printStackTrace();
            return "Error in sending mail: " + e.getMessage();
        }

        try {
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            // Print the stack trace and return a message if an error occurs during sending
            e.printStackTrace();
            return "Error in sending mail: " + e.getMessage();
        }

        return "Invoice email sent successfully";
    }

    
 /* ours---------
	public String invoiceEmail(String toEmailId, String subject, String body, String path) {

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper;
		try {
			helper = new MimeMessageHelper(mimeMessage, true);
			helper.setTo(toEmailId);
			helper.setSubject(subject);
			helper.setText(body);
			
			//String path="C:/Users/Lenovo/Downloads/"+invoiceName+".pdf";
			System.out.println(path+"  #.............................path is");
			File attachment = new File(path);
			
			if (attachment != null && attachment.exists()) 
			{
				helper.addAttachment(attachment.getName(), attachment);
			}
		} 
		catch (Exception e) 
		{
			return "Error in sending mail";
		}

		javaMailSender.send(mimeMessage);

		return "Invoice email sent successfully";
	}
	*/
}