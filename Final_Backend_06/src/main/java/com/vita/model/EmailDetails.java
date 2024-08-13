package com.vita.model;

public class EmailDetails {

    private String sendTo;
    private String path;
	public EmailDetails(String sendTo, String path) {
		super();
		this.sendTo = sendTo;
		this.path = path;
	}
	public EmailDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getSendTo() {
		return sendTo;
	}
	public void setSendTo(String sendTo) {
		this.sendTo = sendTo;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	
}