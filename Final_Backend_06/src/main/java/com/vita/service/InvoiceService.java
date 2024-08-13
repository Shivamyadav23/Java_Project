package com.vita.service;

import java.util.List;

import com.vita.model.Invoice;

public interface InvoiceService {
	public Invoice saveCart(Invoice obj);
	public List<Invoice> getAllInvoice();
}