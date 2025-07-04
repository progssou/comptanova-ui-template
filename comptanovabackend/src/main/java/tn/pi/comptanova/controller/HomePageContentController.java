package tn.pi.comptanova.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.pi.comptanova.dto.HomePageContentDTO;
import tn.pi.comptanova.entity.HomePageContent;
import tn.pi.comptanova.service.HomePageContentService;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/homepage-contents")
@CrossOrigin(origins = "http://localhost:5173")
public class HomePageContentController {
    @Autowired
    private HomePageContentService homePageContentService;

    @GetMapping
    public List<HomePageContentDTO> getAll() {
        return homePageContentService.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public HomePageContentDTO getById(@PathVariable Long id) {
        return homePageContentService.findById(id).map(this::toDTO).orElse(null);
    }

    @PostMapping
    public HomePageContentDTO create(@RequestBody HomePageContentDTO dto) {
        HomePageContent entity = new HomePageContent();
        BeanUtils.copyProperties(dto, entity);
        return toDTO(homePageContentService.save(entity));
    }

    @PutMapping("/{id}")
    public HomePageContentDTO update(@PathVariable Long id, @RequestBody HomePageContentDTO dto) {
        return homePageContentService.findById(id).map(entity -> {
            BeanUtils.copyProperties(dto, entity);
            return toDTO(homePageContentService.save(entity));
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        homePageContentService.deleteById(id);
    }

    private HomePageContentDTO toDTO(HomePageContent entity) {
        HomePageContentDTO dto = new HomePageContentDTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }
} 