package com.notesapp.service.impl;

import com.notesapp.entity.Subject;
import com.notesapp.entity.Unit;
import com.notesapp.entity.User;
import com.notesapp.repository.SubjectRepo;
import com.notesapp.repository.UnitRepo;
import com.notesapp.service.UnitService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitServiceImpl implements UnitService {

    private final UnitRepo unitRepo;
    private final SubjectRepo subjectRepo;

    public UnitServiceImpl(UnitRepo unitRepo, SubjectRepo subjectRepo) {
        this.unitRepo = unitRepo;
        this.subjectRepo = subjectRepo;
    }

    @Override
    public Unit addUnit(int subId, Unit unit) {
        Subject subject = subjectRepo.findById(subId);
        unit.setSubject(subject);
        return unitRepo.save(unit);
    }

    @Override
    public List<Unit> getUnitsBySubject(Subject subject) {
        return unitRepo.findBySubject(subject);
    }

    @Override
    public Unit getUnitById(int unitId) {
        return unitRepo.findById(unitId);
    }

    @Override
    public void deleteUnit(int id) {
        unitRepo.deleteById(id);
    }
}
