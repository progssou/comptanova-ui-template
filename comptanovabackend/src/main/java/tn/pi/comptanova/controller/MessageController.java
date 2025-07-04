package tn.pi.comptanova.controller;


import org.springframework.web.bind.annotation.*;
import tn.pi.comptanova.dto.MessageDTO;
import tn.pi.comptanova.entity.Message;
import tn.pi.comptanova.service.MessageService;
import org.springframework.beans.BeanUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @GetMapping
    public List<MessageDTO> getAll() {
        return messageService.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public MessageDTO getById(@PathVariable Long id) {
        return messageService.findById(id).map(this::toDTO).orElse(null);
    }

    @PostMapping
    public MessageDTO create(@RequestBody MessageDTO dto) {
        Message entity = new Message();
        BeanUtils.copyProperties(dto, entity);
        return toDTO(messageService.save(entity));
    }

    @PutMapping("/{id}")
    public MessageDTO update(@PathVariable Long id, @RequestBody MessageDTO dto) {
        return messageService.findById(id).map(entity -> {
            BeanUtils.copyProperties(dto, entity);
            return toDTO(messageService.save(entity));
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        messageService.deleteById(id);
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<MessageDTO>> getMessagesByCompany(@PathVariable Long companyId) {
        return ResponseEntity.ok(messageService.getMessagesByCompany(companyId));
    }

    private MessageDTO toDTO(Message entity) {
        MessageDTO dto = new MessageDTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }
} 