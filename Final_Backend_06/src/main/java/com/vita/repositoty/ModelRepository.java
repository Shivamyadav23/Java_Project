package com.vita.repositoty;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vita.model.Model;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

    @Query("SELECT m FROM Model m WHERE m.segment.id = :segId AND m.manufacturer.id = :manuId")
    List<Model> findByManufacturerIdAndSegmentId(@Param("segId") long segId, @Param("manuId") long manuId);

    @Query("SELECT m FROM Model m JOIN FETCH m.segment JOIN FETCH m.manufacturer WHERE m.id = :id")
    Optional<Model> findByIdWithDetails(@Param("id") Long id);
}
