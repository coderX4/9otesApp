package com.notesapp.repository;

import com.notesapp.entity.Subject;
import com.notesapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectRepo extends JpaRepository<Subject, Integer> {
    List<Subject> findByUser(User user);
    Subject findById(int id);
}
