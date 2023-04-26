package kr.co.gcInside.service;

import kr.co.gcInside.dao.TermsDAO;
import kr.co.gcInside.vo.TermsVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * TermsService
 * @since 2023/03/08
 * @author 라성준
 *
 */

@Service
public class TermsService {

    @Autowired
    private TermsDAO dao;

    /**
     * terms 약관 가져오기
     * @since 2023/03/08
     * @author 라성준
     * @param type
     * @return
     */
    public TermsVO selectTerm(int type){
        return dao.selectTerm(type);
        //return list.stream().collect(Collectors.groupingBy(TermsVO::getTerm_title_num));
    }

    /**
     * terms 약관 카테고리 이름 가져오기
     * @since 2023/03/08
     * @author 라성준
     */
    public String getTypeName(int type){
        String typeName = "";

        switch(type){
            case 10:
                typeName = "이용약관(지시인사이드 이용약관)"; break;
            case 11:
                typeName = "이용약관(유료서비스 이용약관)"; break;
            case 12:
                typeName = "개인정보처리방침"; break;
            case 13:
                typeName = "개인정보처리방침(개인정보처리방침 쉬운버전)"; break;
            case 14:
                typeName = "청소년 보호정책"; break;
            case 100:
                typeName = "회원가입 서비스이용약관"; break;
            case 101:
                typeName = "회원가입 개인정보처리방침"; break;
        }
        return typeName;


    }

}
