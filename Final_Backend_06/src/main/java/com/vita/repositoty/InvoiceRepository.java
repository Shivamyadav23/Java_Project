package com.vita.repositoty;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vita.model.Invoice;

import jakarta.transaction.Transactional;


@Repository
@Transactional
public interface InvoiceRepository extends JpaRepository<Invoice,Integer> {
	
}