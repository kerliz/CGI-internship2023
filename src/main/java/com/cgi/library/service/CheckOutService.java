package com.cgi.library.service;

import com.cgi.library.entity.CheckOut;
import com.cgi.library.model.CheckOutDTO;
import com.cgi.library.repository.CheckOutRepository;
import com.cgi.library.util.ModelMapperFactory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CheckOutService {

    @Autowired
    private CheckOutRepository checkOutRepository;



    public Page<CheckOutDTO> getCheckOuts(Pageable pageable, Optional<String> sort) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();

        Sort.Direction direction = Sort.Direction.ASC;
        String sortBy = "id"; // default sort field

        if (sort.isPresent()) {
            String[] sortParams = sort.get().split(",");
            sortBy = sortParams[0];
            if (sortParams.length > 1 && sortParams[1].equalsIgnoreCase("desc")) {
                direction = Sort.Direction.DESC;
            }
        }
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(direction, sortBy));
        return checkOutRepository.findAll(sortedPageable).map(checkOut -> modelMapper.map(checkOut, CheckOutDTO.class));
    }


    public Page<CheckOutDTO> getMyCheckOuts(String firstName, String lastName, Pageable pageable) {
        ModelMapper modelMapper = ModelMapperFactory.getMapper();
        return checkOutRepository.findByBorrowerFirstNameAndBorrowerLastName(firstName, lastName, pageable)
                .map(checkOut -> modelMapper.map(checkOut, CheckOutDTO.class));
    }


    public CheckOutDTO getCheckOut(UUID checkOutId) {
        CheckOut checkOut = checkOutRepository.getOne(checkOutId);
        return ModelMapperFactory.getMapper().map(checkOut, CheckOutDTO.class);
    }

    public CheckOutDTO saveCheckOut(CheckOutDTO checkOutDTO) {
        checkOutRepository.save(ModelMapperFactory.getMapper().map(checkOutDTO, CheckOut.class));
        return checkOutDTO;
    }

    public UUID deleteCheckOut(UUID checkOutId) {
        checkOutRepository.deleteById(checkOutId);
        return checkOutId;
    }
}
