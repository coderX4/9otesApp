package com.notesapp.controller;

import com.notesapp.entity.Subject;
import com.notesapp.entity.Unit;
import com.notesapp.repository.SubjectRepo;
import com.notesapp.repository.UnitRepo;
import com.notesapp.service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping({"/api/{subId}"})
public class UnitController {

    @Autowired
    private UnitRepo unitRepo;

    @Autowired
    private SubjectRepo subjectRepo;

    @Autowired
    private UnitService unitService;


    @GetMapping({"/getallunits"})
    public List<Unit> getUnits(@PathVariable("subId") int subId) {
        Subject subject = subjectRepo.findById(subId);
        return unitService.getUnitsBySubject(subject);
    }

    @PostMapping({"/addunit"})
    public ResponseEntity<Unit> addUnit(@PathVariable("subId") int subId, @RequestBody Unit unit) {
        return ResponseEntity.ok(unitService.addUnit(subId, unit));
    }

    @DeleteMapping("/deleteunit/{unitid}")
    public ResponseEntity<?> deleteUnit(@PathVariable("unitid") int unitid) {
        Unit unit = unitRepo.findById(unitid);
        unitRepo.deleteById(unitid);
        return ResponseEntity.ok(unit);  // Return the deleted unit
    }

    @PutMapping({"/updateunit/{unitid}"})
    public ResponseEntity<?> updateUnit(@PathVariable("unitid") int unitid, @RequestParam("unitname") String updatedunitname ) {
        Unit unit = unitRepo.findById(unitid);
        unit.setUnitname(updatedunitname);
        unitRepo.save(unit);
        return ResponseEntity.ok(unit);
    }

    @GetMapping({"/getunit/{unitid}"})
    public ResponseEntity<Unit> getUnit(@PathVariable("unitid") int unitid) {
        Unit unit = unitRepo.findById(unitid);
        return ResponseEntity.ok(unit);
    }
}
