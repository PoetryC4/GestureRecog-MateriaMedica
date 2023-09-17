package com.tcm.jsjsjds.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

@Data
@TableName(value = "quizzes")
public class Quiz implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "quiz_id", type = IdType.AUTO)
    private Integer quizId;
    private short quizType;
    private String quizTitle;
    private short quizLvl;
    private String choiceA;
    private String choiceB;
    private String choiceC;
    private String choiceD;
    private String answers;
    private short isSingle;
    private String solution;
}
