package tn.pi.comptanova.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.pi.comptanova.entity.VATEntry;
import tn.pi.comptanova.repository.VATEntryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class VATEntryService {
    @Autowired
    private VATEntryRepository vatEntryRepository;

    public List<VATEntry> findAll() {
        return vatEntryRepository.findAll();
    }

    public Optional<VATEntry> findById(Long id) {
        return vatEntryRepository.findById(id);
    }

    public VATEntry save(VATEntry vatEntry) {
        return vatEntryRepository.save(vatEntry);
    }

    public void deleteById(Long id) {
        vatEntryRepository.deleteById(id);
    }
} 