package com.cgi.library.controller;

import com.cgi.library.model.CheckOutDTO;
import com.cgi.library.service.CheckOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/checkout")
public class CheckOutController {

    @Autowired
    private CheckOutService checkOutService;

    @GetMapping(value = "getCheckouts")
    public ResponseEntity<Page<CheckOutDTO>> getCheckOuts(Pageable pageable, @RequestParam (value = "sort") Optional<String> sort) {
        return ResponseEntity.ok(checkOutService.getCheckOuts(pageable, sort));
    }


    /*
    @GetMapping(value = "getSorting")
    public ResponseEntity<Page<CheckOutDTO>> getSorting() {
       // Pageable pageable = PageRequest.of(page, size, Sort.by(sort[0]).direction(Sort.Direction.valueOf(sort[1])));



        return ResponseEntity.ok(checkOutService.getSorting(pageable));
    }

     */



    @GetMapping(value = "getCheckout")
    public ResponseEntity<CheckOutDTO> getCheckOut(@RequestParam(value = "checkOutId") UUID checkOutId) {
        return ResponseEntity.ok(checkOutService.getCheckOut(checkOutId));
    }

    @GetMapping(value = "getMyCheckouts")
    public ResponseEntity<Page<CheckOutDTO>> getMyCheckOuts(Pageable pageable, @RequestParam(value = "firstName") String borrowerFirstName , @RequestParam(value = "lastName") String borrowerLastName) {

        return ResponseEntity.ok(checkOutService.getMyCheckOuts(borrowerFirstName, borrowerLastName, pageable));
    }



    @PostMapping(value = "checkout")
    public ResponseEntity<CheckOutDTO> saveCheckOut(@RequestBody CheckOutDTO checkOutDTO) {
        CheckOutDTO savedCheckOut = checkOutService.saveCheckOut(checkOutDTO);
        return ResponseEntity.ok(savedCheckOut);
    }


    @DeleteMapping(value = "checkout")
    public ResponseEntity<UUID> deleteCheckOut(@RequestParam(value = "checkOutId") UUID checkOutId) {
        UUID deletedCheckout = checkOutService.deleteCheckOut(checkOutId);
        return ResponseEntity.ok(deletedCheckout);
    }
}
