package com.cgi.library.controller;

import com.cgi.library.model.BookDTO;
import com.cgi.library.model.BookStatus;
import com.cgi.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;


    @GetMapping(value = "getBooks")
    public ResponseEntity<Page<BookDTO>> getBooks(Pageable pageable, @RequestParam (value = "sort") Optional<String> sort) {
        return ResponseEntity.ok(bookService.getBooks(pageable, sort));
    }

    @GetMapping(value = "getBooksByStatus")
    public ResponseEntity<Page<BookDTO>> getAvailableBooks(@RequestParam("status") BookStatus value, Pageable pageable, @RequestParam (value = "sort") Optional<String> sort) {
        return ResponseEntity.ok(bookService.getBooksByStatus(value, pageable,sort));
    }

    @GetMapping(value = "searchBooks")
    public ResponseEntity<Page<BookDTO>> searchBooks(@RequestParam("searchValue") String value, Pageable pageable,  @RequestParam (value = "sort") Optional<String> sort) {
        return ResponseEntity.ok(bookService.searchBooks(value, pageable, sort));
    }


    @GetMapping(value = "getBook")
    public ResponseEntity<BookDTO> getBook(@RequestParam(value = "bookId") UUID bookId) {
        return ResponseEntity.ok(bookService.getBook(bookId));
    }


    @PostMapping(value = "updateBookStatus")
    public ResponseEntity<BookDTO>  updateBookStatus(@RequestParam(value = "bookId") UUID bookId, @RequestParam(value = "status") String status, @RequestParam(value = "dueDate") String dueDate) {
        return ResponseEntity.ok(bookService.updateBookStatus(bookId, status, dueDate));
    }


    @PostMapping(value = "saveBook")
    public ResponseEntity<String> saveBook(@RequestBody BookDTO book) {
        return ResponseEntity.ok(String.valueOf(bookService.saveBook(book)));
    }

    @DeleteMapping(value = "deleteBook")
    public ResponseEntity<String> deleteBook(@RequestParam(value = "bookId") UUID bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.ok("");
    }
}
