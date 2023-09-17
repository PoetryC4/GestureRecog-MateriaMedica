package com.tcm.jsjsjds.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tcm.jsjsjds.entity.Quiz;
import com.tcm.jsjsjds.mapper.QuizMapper;
import com.tcm.jsjsjds.service.QuizService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class QuizServiceImpl extends ServiceImpl<QuizMapper, Quiz> implements QuizService {
}
