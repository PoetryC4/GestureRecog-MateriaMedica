package com.tcm.jsjsjds.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tcm.jsjsjds.entity.Ingredient;
import com.tcm.jsjsjds.mapper.IngredientMapper;
import com.tcm.jsjsjds.service.IngredientService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class IngredientServiceImpl extends ServiceImpl<IngredientMapper, Ingredient> implements IngredientService {

    @Autowired
    IngredientMapper ingredientMapper;

    public Ingredient getRandomPicName() {
        return ingredientMapper.getRandomPicName();
    }


}
