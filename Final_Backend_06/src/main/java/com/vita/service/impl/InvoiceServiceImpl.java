package com.vita.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vita.model.Invoice;
import com.vita.repositoty.InvoiceRepository;
import com.vita.service.InvoiceService;


@Service
public class InvoiceServiceImpl implements InvoiceService {

	@Autowired
	private InvoiceRepository invoiceRepo;

	// Insert
	public Invoice saveCart(Invoice obj) {
		return invoiceRepo.save(obj);
	}

	@Override
	public List<Invoice> getAllInvoice() {
		
//		List<Invoice> invocies=new ArrayList<Invoice>() ;
//		Invoice ob=new Invoice();
//		int[] arr=new int[] {10,20};
//		ob.setAltCompId(arr);
//		invocies.add(ob);
//		return invocies;
		return invoiceRepo.findAll();
	}
	

}