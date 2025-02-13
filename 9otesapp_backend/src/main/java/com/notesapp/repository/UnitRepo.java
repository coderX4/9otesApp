package com.notesapp.repository;

import com.notesapp.entity.Subject;
import com.notesapp.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnitRepo extends JpaRepository<Unit, Integer> {
    List<Unit> findBySubject(Subject subject);
    Unit findById(int id);
}
