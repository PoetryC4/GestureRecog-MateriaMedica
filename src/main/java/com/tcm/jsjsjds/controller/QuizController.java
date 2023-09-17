package com.tcm.jsjsjds.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tcm.jsjsjds.common.R;
import com.tcm.jsjsjds.entity.Quiz;
import com.tcm.jsjsjds.service.QuizService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;


    @GetMapping("/get")
    public R<Quiz> getQuiz(Integer quizId,Integer quizType,short quizLvl) {
        LambdaQueryWrapper<Quiz> queryWrapper = new LambdaQueryWrapper<>();
        if(quizType != 0) {
            queryWrapper.eq(Quiz::getQuizType,quizType);
        }
        queryWrapper.eq(Quiz::getQuizLvl,quizLvl);

        int countType = quizService.count(queryWrapper);

        Quiz quiz = new Quiz();

        if(quizId == null) {
            Page pageInfo = new Page((long) Math.ceil(Math.random()*countType),1);

            LambdaQueryWrapper<Quiz> queryWrapperP = new LambdaQueryWrapper<>();
            if(quizType != 0) {
                queryWrapperP.eq(Quiz::getQuizType,quizType);
            }
            queryWrapperP.eq(Quiz::getQuizLvl,quizLvl);

            queryWrapperP.orderByAsc(Quiz::getQuizId);

            IPage pageRes = quizService.page(pageInfo,queryWrapperP);

            quiz = (Quiz) pageRes.getRecords().get(0);
        } else {
            quiz.setQuizId(quizId);

            while(Objects.equals(quiz.getQuizId(), quizId)) {
                Page pageInfo = new Page((long) Math.ceil(Math.random()*countType),1);

                LambdaQueryWrapper<Quiz> queryWrapperP = new LambdaQueryWrapper<>();
                if(quizType != 0) {
                    queryWrapperP.eq(Quiz::getQuizType,quizType);
                }
                queryWrapperP.eq(Quiz::getQuizLvl,quizLvl);

                queryWrapperP.orderByAsc(Quiz::getQuizId);

                IPage pageRes = quizService.page(pageInfo,queryWrapperP);

                quiz = (Quiz) pageRes.getRecords().get(0);
            }
        }
        return R.success(quiz);
    }

    @PostMapping("/post")
    public R<String> saveQuiz(String choiceA,String choiceB,String choiceC,String choiceD,String title,short quizType,String quizAns,short quizLvl,String solution) {
        if(quizAns.isEmpty()) return R.error("添加失败");
        Quiz quiz = new Quiz();
        quiz.setQuizTitle(title);
        quiz.setQuizLvl(quizLvl);
        quiz.setChoiceA(choiceA);
        quiz.setChoiceB(choiceB);
        quiz.setChoiceC(choiceC);
        quiz.setChoiceD(choiceD);
        quiz.setAnswers(quizAns);
        quiz.setQuizType(quizType);
        quiz.setSolution(solution);
        quiz.setIsSingle((short) (quizAns.length()==1?1:0));
        log.info(quiz.toString());
        if(quizService.save(quiz))
        return R.success("添加成功");
        else return R.error("添加失败");
    }
}
