package com.tcm.jsjsjds.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tcm.jsjsjds.entity.Ingredient;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IngredientMapper extends BaseMapper<Ingredient> {
    public Ingredient getRandomPicName();
}
