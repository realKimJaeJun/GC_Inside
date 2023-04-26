package kr.co.gcInside.controller;

import kr.co.gcInside.service.TermsService;
import kr.co.gcInside.vo.TermsVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * Terms 컨트롤러
 * @since 2023/03/08
 * @author 라성준
 *
 */

@Controller
public class TermsController {

    @Autowired
    private TermsService service;

    @GetMapping("terms/")
    public String terms(Model model, int type){
        TermsVO term = service.selectTerm(type);
        String typeName = service.getTypeName(type);

        model.addAttribute("type", type);
        model.addAttribute("term", term);
        model.addAttribute("typeName", typeName);

        return "terms";
    }

    @GetMapping("terms/policy")
    public String policy(Model model) {
        TermsVO data = service.selectTerm(10);
        model.addAttribute("data", data);
        return "terms/policy";
    }

    @GetMapping("terms/privacy")
    public String privacy(Model model) {
        TermsVO data = service.selectTerm(12);
        model.addAttribute("data", data);
        return "terms/privacy";
    }

    @GetMapping("terms/pay_policy")
    public String pay_policy(Model model) {
        TermsVO data = service.selectTerm(11);
        model.addAttribute("data", data);
        return "terms/pay_policy";
    }

    @GetMapping("terms/privacy_young")
    public String privacy_young(Model model) {
        TermsVO data = service.selectTerm(13);
        model.addAttribute("data", data);
        return "terms/privacy_young";
    }

    @GetMapping("terms/youth_policy")
    public String youth_policy(Model model) {
        TermsVO data = service.selectTerm(14);
        model.addAttribute("data", data);
        return "terms/youth_policy";
    }
}
