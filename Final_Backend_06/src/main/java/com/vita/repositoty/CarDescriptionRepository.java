package com.vita.repositoty;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vita.model.CarDescription;

@Repository
public interface CarDescriptionRepository extends JpaRepository<CarDescription, Long> {
}
