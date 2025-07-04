package tn.pi.comptanova.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.pi.comptanova.entity.VATEntry;

public interface VATEntryRepository extends JpaRepository<VATEntry, Long> {
} 