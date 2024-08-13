package com.vita.service;

import java.util.List;
import java.util.Optional;

import com.vita.model.Model;

public interface ModelService {
    List<Model> getAllModels();
    List<Model> getAllModelsByManuIdAndSegId(long segId, long manuId);
    Optional<Model> getModelById(long id);
}
