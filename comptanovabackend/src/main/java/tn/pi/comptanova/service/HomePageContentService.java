package tn.pi.comptanova.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.pi.comptanova.entity.HomePageContent;
import tn.pi.comptanova.repository.HomePageContentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class HomePageContentService {
    @Autowired
    private HomePageContentRepository homePageContentRepository;

    public List<HomePageContent> findAll() {
        return homePageContentRepository.findAll();
    }

    public Optional<HomePageContent> findById(Long id) {
        return homePageContentRepository.findById(id);
    }

    public HomePageContent save(HomePageContent homePageContent) {
        return homePageContentRepository.save(homePageContent);
    }

    public void deleteById(Long id) {
        homePageContentRepository.deleteById(id);
    }
} 