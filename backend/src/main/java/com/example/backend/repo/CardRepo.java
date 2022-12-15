package com.example.backend.repo;

import com.example.backend.models.Card;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepo extends MongoRepository <Card, String>{
}
