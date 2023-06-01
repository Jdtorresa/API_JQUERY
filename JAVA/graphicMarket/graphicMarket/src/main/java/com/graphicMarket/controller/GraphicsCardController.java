package com.graphicMarket.controller;

import com.graphicMarket.entity.GraphicsCard;
import com.graphicMarket.services.GraphicsCardService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://127.0.0.1:3000")
@RequestMapping("/graphics")
@RestController
public class GraphicsCardController {

    private GraphicsCardService graphicsCardService;

    public GraphicsCardController(GraphicsCardService graphicsCardService) {
        this.graphicsCardService = graphicsCardService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<GraphicsCard>> allGraphicsCards(HttpServletResponse response) {
        return new ResponseEntity<>(graphicsCardService.AllGraphicsCards(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<GraphicsCard> GraphicsCardById(@PathVariable int id){
        if(graphicsCardService.GraphicsCardById(id)!=null){
            return new ResponseEntity<>(graphicsCardService.GraphicsCardById(id), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/new")
    public ResponseEntity<GraphicsCard> AddGraphicsCard(@RequestBody GraphicsCard NewGraphicsCard){
        if(graphicsCardService.GraphicsCardById(NewGraphicsCard.getId())==null){
            graphicsCardService.AddGraphicsCard(NewGraphicsCard);
            return new ResponseEntity<>(NewGraphicsCard, HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GraphicsCard> DeleteGraphicsCard(@PathVariable int id){
        if(graphicsCardService.GraphicsCardById(id)!=null){
            graphicsCardService.DeleteGraphicsCard(id);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/update")
    public ResponseEntity<GraphicsCard> UpdateGraphicsCard(@RequestBody GraphicsCard graphicsCard){
        if(graphicsCardService.GraphicsCardById(graphicsCard.getId())!=null){
            graphicsCardService.UpdateGraphicsCard(graphicsCard);
            return new ResponseEntity<>(graphicsCard, HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
