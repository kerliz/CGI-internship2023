package com.cgi.library.repository;

import com.cgi.library.entity.Book;
import com.cgi.library.model.BookStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
    Page<Book> findByStatus(BookStatus status, Pageable pageable);


    @Query("SELECT b FROM Book b WHERE LOWER (b.title) LIKE %:search% OR LOWER (b.author) LIKE %:search% OR LOWER (b.genre) LIKE %:search% OR LOWER (b.year) LIKE %:search%")
    Page<Book> searchBooks(@Param("search") String search, Pageable pageable);

}
