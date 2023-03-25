package com.cgi.library.controller;

import com.cgi.library.model.CheckOutDTO;
import com.cgi.library.service.CheckOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/checkout")
public class CheckOutController {

    @Autowired
    private CheckOutService checkOutService;

    @GetMapping(value = "getCheckouts")
    public ResponseEntity<Page<CheckOutDTO>> getCheckOuts(Pageable pageable) {
        return ResponseEntity.ok(checkOutService.getCheckOuts(pageable));
    }

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
        System.out.println(savedCheckOut);
        return ResponseEntity.ok(savedCheckOut);
    }


    @DeleteMapping(value = "checkout")
    public ResponseEntity<String> deleteCheckOut(@RequestParam(value = "checkOutId") UUID checkOutId) {
        checkOutService.deleteCheckOut(checkOutId);
        System.out.println(checkOutId);
        return ResponseEntity.ok("");
    }
}
