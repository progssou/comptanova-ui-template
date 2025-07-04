package tn.pi.comptanova.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.pi.comptanova.entity.Period;
import tn.pi.comptanova.repository.PeriodRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PeriodService {
    @Autowired
    private PeriodRepository periodRepository;

    public List<Period> findAll() {
        return periodRepository.findAll();
    }

    public Optional<Period> findById(Long id) {
        return periodRepository.findById(id);
    }

    public Period save(Period period) {
        return periodRepository.save(period);
    }

    public void deleteById(Long id) {
        periodRepository.deleteById(id);
    }
} 