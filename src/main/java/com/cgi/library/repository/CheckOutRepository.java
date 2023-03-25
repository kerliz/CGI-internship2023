package com.cgi.library.repository;

import com.cgi.library.entity.Book;
import com.cgi.library.entity.CheckOut;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CheckOutRepository extends JpaRepository<CheckOut, UUID> {

    Page<CheckOut> findByBorrowerFirstNameAndBorrowerLastName(String borrowerFirstName, String borrowerLastName, Pageable pageable);
}
