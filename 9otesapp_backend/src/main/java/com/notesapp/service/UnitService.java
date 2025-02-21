package com.notesapp.service;

import com.notesapp.entity.Subject;
import com.notesapp.entity.Unit;

import java.util.List;

public interface UnitService {
    Unit addUnit(int subId, Unit unit);

    List<Unit> getUnitsBySubject(Subject subject);

    Unit getUnitById(int unitId);

    void deleteUnit(int id);
}
