package com.example.backend.repo;

import com.example.backend.models.PokeCard;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepo extends MongoRepository <PokeCard, String>{
}
