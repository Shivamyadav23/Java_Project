package com.vita.service;

public interface EmailService {
    String loginEmail(String toEmailId, String subject, String body);
    String invoiceEmail(String toEmailId, String subject, String body , String path);
}