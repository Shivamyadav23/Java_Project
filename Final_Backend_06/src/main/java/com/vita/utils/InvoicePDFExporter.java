package com.vita.utils;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Component;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.vita.model.Invoice;

import jakarta.servlet.http.HttpServletResponse;

@Component
public class InvoicePDFExporter {
    private List<Invoice> invoices;

    public InvoicePDFExporter(List<Invoice> invoices) {
        this.invoices = invoices;
    }

    private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setPadding(5);
        cell.setBackgroundColor(new BaseColor(0, 0, 255)); // Blue

        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setColor(BaseColor.WHITE); // White

        cell.setPhrase(new Phrase("ID", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("User ID", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Model ID", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Alt Comp ID", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Ordered Qty", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Model Price", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Total Price", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table) {
        for (Invoice invoice : invoices) {
            table.addCell(String.valueOf(invoice.getId()));
            table.addCell(String.valueOf(invoice.getUserId()));
            table.addCell(String.valueOf(invoice.getModelId()));
            table.addCell(String.valueOf(invoice.getAltCompId()));
            table.addCell(String.valueOf(invoice.getOrderedQty()));
            table.addCell(String.valueOf(invoice.getModelPrice()));
            table.addCell(String.valueOf(invoice.getTotalPrice()));
        }
    }

    public void export(HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setSize(18);
        font.setColor(BaseColor.BLUE); // Blue

        Paragraph p = new Paragraph("List of Invoices", font);
        p.setAlignment(Paragraph.ALIGN_CENTER);

        document.add(p);

        PdfPTable table = new PdfPTable(7); // Changed to 7 columns
        table.setWidthPercentage(100f);
        table.setWidths(new float[] {1.5f, 1.5f, 1.0f, 1.0f, 1.0f, 1.0f, 1.0f});
        table.setSpacingBefore(10);

        writeTableHeader(table);
        writeTableData(table);

        document.add(table);

        document.close();
    }
}
