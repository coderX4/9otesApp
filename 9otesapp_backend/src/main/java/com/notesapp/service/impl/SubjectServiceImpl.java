package com.notesapp.service.impl;

import com.notesapp.entity.Subject;
import com.notesapp.entity.Unit;
import com.notesapp.entity.User;
import com.notesapp.repository.SubjectRepo;
import com.notesapp.repository.UnitRepo;
import com.notesapp.repository.UserRepo;
import com.notesapp.service.SubjectService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepo subjectRepo;
    private final UnitRepo unitRepo;
    private final UserRepo userRepo;

    public SubjectServiceImpl(SubjectRepo subjectRepo, UnitRepo unitRepo, UserRepo userRepo) {
        this.subjectRepo = subjectRepo;
        this.unitRepo = unitRepo;
        this.userRepo = userRepo;
    }


    @Override
    public Subject addSubject(int userId, Subject subject) {
        User user = userRepo.findById(userId);
        subject.setUser(user);
        return subjectRepo.save(subject);
    }

    @Override
    public List<Subject> getSubjectsByUser(User user) {
        return subjectRepo.findByUser(user);
    }

    @Override
    public Subject getSubjectById(int subid) {
        return subjectRepo.findById(subid);
    }

    @Override
    public void deleteSub(int id){
        subjectRepo.deleteById(id);
    }

}
