package com.tcm.jsjsjds.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tcm.jsjsjds.common.R;
import com.tcm.jsjsjds.entity.Ingredient;
import com.tcm.jsjsjds.service.IngredientService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping("/ingredient")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;


    @GetMapping("/pic")
    public R<Ingredient> getRandomIngredientPicName() {

        Ingredient ingredient = ingredientService.getRandomPicName();

        return R.success(ingredient);
    }
    @GetMapping("/rand")
    public R<Ingredient> getRandomIngredient(Integer[] existingIds) {
        Ingredient ingredient = new Ingredient();
        boolean isOk = false;
        HashMap<Integer, Object> map = new HashMap<>();
        //构造条件构造器
        if(existingIds==null) isOk=true;
        else {
            for (int i = 0; i < existingIds.length; i++) {
                map.put(existingIds[i], null);
            }
        }
        LambdaQueryWrapper<Ingredient> queryWrapper = new LambdaQueryWrapper<>();
        int countType = ingredientService.count(queryWrapper);

        boolean flag = true;
        while(flag||!isOk) {
            flag=false;
            Page pageInfo = new Page((long) Math.ceil(Math.random()*countType),1);

            LambdaQueryWrapper<Ingredient> queryWrapperP = new LambdaQueryWrapper();

            queryWrapperP.orderByAsc(Ingredient::getIngredientId);

            IPage pageRes = ingredientService.page(pageInfo,queryWrapperP);

            ingredient = (Ingredient) pageRes.getRecords().get(0);
            if(!map.containsKey(ingredient.getIngredientId())) break;
            //no duplicate ids
        }
        map.clear();
        return R.success(ingredient);
    }

    @PostMapping("/post")
    public R<String> saveIngredient(String ingredientType,String ingredientName,String explanations,String interpretation,String note,String picName) {
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredientType(Integer.parseInt(ingredientType));
        ingredient.setIngredientName(ingredientName);
        ingredient.setExplanations(explanations);
        ingredient.setInterpretation(interpretation);
        ingredient.setPicName(picName);
        ingredient.setNote(note);
        if(ingredientService.save(ingredient))
        return R.success("添加成功");
        else return R.success("添加失败");
    }

    @GetMapping("/get")
    public R<Ingredient> getIngredientById(String ingredientId) {
        Ingredient ingredient;

        LambdaQueryWrapper<Ingredient> queryWrapper = new LambdaQueryWrapper<>();

        queryWrapper.eq(Ingredient::getIngredientId,Integer.parseInt(ingredientId));

        ingredient = ingredientService.getOne(queryWrapper);

        return R.success(ingredient);
    }

    @GetMapping("/nameget")
    public R<Ingredient> getIngredientByName(String ingredientName) {
        Ingredient ingredient;

        LambdaQueryWrapper<Ingredient> queryWrapper = new LambdaQueryWrapper<>();

        queryWrapper.eq(Ingredient::getIngredientName,ingredientName);

        ingredient = ingredientService.getOne(queryWrapper);

        if(ingredient == null) return R.error("无该药材~");

        return R.success(ingredient);
    }

}
