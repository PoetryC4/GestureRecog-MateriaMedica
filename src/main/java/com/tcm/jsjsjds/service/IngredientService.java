package com.tcm.jsjsjds.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tcm.jsjsjds.entity.Ingredient;
import com.tcm.jsjsjds.mapper.IngredientMapper;
import org.springframework.beans.factory.annotation.Autowired;

public interface IngredientService extends IService<Ingredient> {

    public Ingredient getRandomPicName();
}
