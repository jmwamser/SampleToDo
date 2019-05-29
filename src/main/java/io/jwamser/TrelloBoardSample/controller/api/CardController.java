package io.jwamser.TrelloBoardSample.controller.api;

import io.jwamser.TrelloBoardSample.model.Card;
import io.jwamser.TrelloBoardSample.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
public class CardController {

    @Autowired
    private CardService cardService;

    @CrossOrigin
    @RequestMapping("/cards")
    public List<Card> getAllCards() {
        return cardService.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/cards",method = RequestMethod.POST)
    public Card addCard(@RequestBody Card card) {
        return cardService.save(card);
    }

    @RequestMapping("/cards/{id}")
    public Card findCard(@PathVariable String id){
       return cardService.findById(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/cards/{id}",method = RequestMethod.PUT)
    public Card putCard(@PathVariable String id,@RequestBody Card card){
        Card oldCard = cardService.findById(id);

        oldCard.setStatus(card.getStatus());
        oldCard.setSummary(card.getSummary());

        Card newCard = cardService.save(oldCard);

        return newCard;
    }
}
