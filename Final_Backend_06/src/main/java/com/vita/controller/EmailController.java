package com.vita.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vita.model.EmailDetails;
import com.vita.service.EmailService;

@RestController
@RequestMapping("api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;
    
    private static final String SUBJECT = "Login Successful :)";
    private static final String BODY = "Dear Valued User,\n\nCongratulations! You have successfully logged into the system. We are thrilled to have you with us and look forward to serving you.\n\nIf you have any questions or need assistance, please don't hesitate to reach out.\n\nBest regards,\nTeam-Group 4";

    @PostMapping("/onSignUp")
    public String sendMail(@RequestBody EmailDetails emailDetails) {
        String email = emailDetails.getSendTo();
        return emailService.loginEmail(email, SUBJECT, BODY);    
    }
    private static final String SUBJECT2 = "Your Purchase Was Successful!";
    private static final String BODY2 = "Dear Valued Customer,\n\nCongratulations on your recent purchase! We are pleased to inform you that your order has been successfully processed. Attached to this email is a PDF invoice for your reference.\n\nThank you for choosing us for your purchase. If you have any questions or need further assistance, please feel free to reach out.\n\nBest regards,\nTeam-Group 4";

    @PostMapping("/mailInvoice")
    public String sendInvoice(@RequestBody EmailDetails emailDetails)
    {	
    	String email= emailDetails.getSendTo();
    	String path= emailDetails.getPath();
    	System.out.println("sending invoice on email started................................................................");
    	return emailService.invoiceEmail(email, SUBJECT2, BODY2, path);
    }
}
 