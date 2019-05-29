package io.jwamser.TrelloBoardSample.service;

import io.jwamser.TrelloBoardSample.model.Card;
import io.jwamser.TrelloBoardSample.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    public List<Card> findAll() {

        Iterable<Card> it = cardRepository.findAll();

        ArrayList<Card> cards = new ArrayList<>();


        for (Card card : it) {
            cards.add(card);
        }

        return cards;
    }

    public Card save(Card card) {
        return cardRepository.save(card);
    }

    public Card findById(String id){
        return cardRepository.findById(id).orElse(new Card());
    }
}
