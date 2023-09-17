package com.tcm.jsjsjds.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

@Data
@TableName(value = "ingredient")
public class Ingredient implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "ingredient_id", type = IdType.AUTO)
    private Integer ingredientId;
    private Integer ingredientType;
    private String explanations;
    private String ingredientName;
    private String interpretation;
    private String note;
    private String picName;
}
