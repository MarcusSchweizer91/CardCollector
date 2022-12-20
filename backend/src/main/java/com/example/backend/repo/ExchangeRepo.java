package com.example.backend.repo;

import com.example.backend.models.ExchangeCard;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExchangeRepo extends MongoRepository<ExchangeCard, String> {

}
