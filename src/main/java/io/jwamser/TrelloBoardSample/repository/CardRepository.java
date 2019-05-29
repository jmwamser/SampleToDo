package io.jwamser.TrelloBoardSample.repository;

import io.jwamser.TrelloBoardSample.model.Card;
import org.springframework.data.repository.CrudRepository;

public interface CardRepository extends CrudRepository<Card,String> {

}
