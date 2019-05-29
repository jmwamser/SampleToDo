package io.jwamser.TrelloBoardSample.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {

    @RequestMapping("/")
    public String index() {
        return "Hello World";
    }
}
