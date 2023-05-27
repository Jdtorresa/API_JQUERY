package com.graphicMarket.services;

import com.graphicMarket.entity.GraphicsCard;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class GraphicsCardService {
    List<GraphicsCard> ListGraphicsCards = new ArrayList<>();
    public GraphicsCardService() {
        ListGraphicsCards.add(new GraphicsCard(1, "Nvidia", "GeForce RTX 3080", 10, 3));
        ListGraphicsCards.add(new GraphicsCard(2, "AMD", "Radeon RX 6800 XT", 16, 2));
        ListGraphicsCards.add(new GraphicsCard(3, "Nvidia", "GeForce GTX 1660 Super", 6, 1));
        ListGraphicsCards.add(new GraphicsCard(4, "AMD", "Radeon RX 6900 XT", 16, 3));
        ListGraphicsCards.add(new GraphicsCard(5, "Nvidia", "GeForce RTX 3070", 8, 2));
        ListGraphicsCards.add(new GraphicsCard(6, "AMD", "Radeon RX 6700 XT", 12, 2));
    }

    public List<GraphicsCard> AllGraphicsCards(){
        return ListGraphicsCards;
    }
    public GraphicsCard GraphicsCardById(int id){
        GraphicsCard graphicsCard=null;
        for(GraphicsCard g: ListGraphicsCards){
            if(g.getId()==id){
                graphicsCard=g;
                break;
            }
        }
        return graphicsCard;
    }

    public void AddGraphicsCard(GraphicsCard graphicsCard){
        ListGraphicsCards.add(graphicsCard);
    }

    public void DeleteGraphicsCard(int id){
            ListGraphicsCards.remove(id);
    }

    public void UpdateGraphicsCard(GraphicsCard graphicsCardUpdated){
            for (GraphicsCard g : ListGraphicsCards) {
                if (g.getId() == graphicsCardUpdated.getId()) {
                    g.setBrand(graphicsCardUpdated.getBrand());
                    g.setModel(graphicsCardUpdated.getModel());
                    g.setVram(graphicsCardUpdated.getVram());
                    g.setFanCount(graphicsCardUpdated.getFanCount());
                    return;
                }
            }

    }
}
