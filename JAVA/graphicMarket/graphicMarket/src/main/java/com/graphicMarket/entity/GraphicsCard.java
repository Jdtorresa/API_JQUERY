package com.graphicMarket.entity;

public class GraphicsCard {
    private int id;
    private String brand;
    private String model;
    private int vram;
    private int fanCount;

    public GraphicsCard() {
    }
    public GraphicsCard(int id, String brand, String model, int vram, int fanCount) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.vram = vram;
        this.fanCount = fanCount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getVram() {
        return vram;
    }

    public void setVram(int vram) {
        this.vram = vram;
    }

    public int getFanCount() {
        return fanCount;
    }

    public void setFanCount(int fanCount) {
        this.fanCount = fanCount;
    }

    @Override
    public String toString() {
        return "GraphicsCard{" +
                "id=" + id +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", vram=" + vram +
                ", fanCount=" + fanCount +
                '}';
    }
}