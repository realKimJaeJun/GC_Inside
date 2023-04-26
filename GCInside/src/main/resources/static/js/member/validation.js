/* 회원가입 이메일 리스트 클릭 */
let showLayer = function(obj, layerName){
	if($("#"+layerName).css("display") == "none"){
		$("#"+layerName).show();
	} else {
		$("#"+layerName).hide();
	}
}
/* 유효성 검사 */
//아이디
let id_check = false; //검증결과 상태변수 초기값
$(function(){
    let isID = /^(?=.*[a-z])[a-zA-Z0-9]{3,20}$/; // 대문자와 숫자는 단일로는 못쓰게 방지
    let member_uid = $('#member_uid').val();

    $("input[name='member_uid']").on('input', function(){
        id_check = false; // 아이디 입력중에는 검증결과 초기화
    });

    $("input[name='member_uid']").focusout(function(){
        let member_uid = $("input[name='member_uid']").val();

        if(!member_uid.match(isID)){
            id_check = false;
            $('#id_unable').text('사용할 수 없는 아이디 입니다.');
            $('#id_able').css('display','none');
            $("#id_tip_msg").css('display','none');
            $('#id_unable').css('display','block');
        }else if(member_uid.search(/\s/) != -1){ // 공백 허용 X
            id_check = false;
            $('#id_unable').text('사용할 수 없는 아이디 입니다.');
            $('#id_able').css('display','none');
            $("#id_tip_msg").css('display','none');
            $('#id_unable').css('display','block');
        } else {
            let jsonData = {"member_uid":member_uid};
            $.ajax({
                type : "GET",
                url : "/GCInside/member/checkUid",
                data : jsonData,
                success : function(data){
                    if(data.result === "success"){
                        id_check = true;
                        $('#id_able').text('사용가능합니다.');
                        $('#id_able').css('display','block');
                        $('#id_unable').css('display','none');
                        $("#id_tip_msg").css('display','none');
                    } else {
                        id_check = false;
                        $('#id_unable').text('사용할 수 없는 아이디 입니다.');
                        $('#id_able').css('display','none');
                        $("#id_tip_msg").css('display','none');
                        $('#id_unable').css('display','block');
                    }
                }
            });
        }
    });
});

//비밀번호
pw_check = false; //비밀번호체크
let isCheckPw= function(){
	let gc_pw = $('#gc_pw').val();
	let gc_pwc = $('#gc_pwc').val();
	let member_uid = $('#member_uid').val();
	let user_nick = $('#user_nick').val();
	let gc_pre = $('#pw_pre').val();

	let pattern = /^[^ ].*[^ ]$/;
	let pattern1 = /[0-9]/;
	let pattern2 = /[a-z]/;
	let pattern3 = /[~`!@#$%^&*()_+|=\-{}<>[\]?;:'",./]/;
	let pattern4 = /[A-Z]/; //대문자

	$('.step_box').removeClass('normal')
	$('.step_box').removeClass('safe')
	$('.step_box').removeClass('impossible')
	$('.tip3').css('display','none');
	$('.tip2').css('display','none');
	$('.tip4').css('display','none');
	$('.pw_tip .chkStr').removeClass('on')
	$('.pw_tip .chkLen').removeClass('on')
	$('.step_box .step_txt').html('');

    if(gc_pw == ''){
        return false;
    }
    if(gc_pre && gc_pre == gc_pw){
        $('.step_box').addClass('impossible')
        $('.step_box .step_txt').html('사용 불가');
        $('.tip4').css('display','block');
        pw_check = false;
        return false;
    }

    if(gc_pwc && gc_pw == gc_pwc)	$('.tip1').css('display','none')

    if(gc_pw == member_uid || gc_pw == user_nick){
        $('.step_box').addClass('impossible')
        $('.step_box .step_txt').html('사용 불가');
        $('.tip2').css('display','block');
        pw_check = false;
        return false;
    }

    if(!pattern1.test(gc_pw) || !pattern2.test(gc_pw) || !pattern3.test(gc_pw)){
        $('.pw_tip .chkStr').removeClass('on')
    }else{
        $('.pw_tip .chkStr').addClass('on')
    }
    if(gc_pw.length < 8 || gc_pw.length > 20){
        $('.pw_tip .chkLen').removeClass('on')
    }else{
        $('.pw_tip .chkLen').addClass('on')
    }

    if(!pattern1.test(gc_pw) || !pattern2.test(gc_pw) || !pattern3.test(gc_pw) || !pattern.test(gc_pw) || gc_pw.length < 8 || gc_pw.length > 20){

        $('.step_box').addClass('impossible')
        $('.step_box .step_txt').html('사용 불가');

        if(chkContinue(gc_pw))	$('.tip3').css('display','block');
        pw_check = false;

    }else{

        if(chkContinue(gc_pw)){

            $('.tip3').css('display','block');
            $('.step_box').addClass('impossible')
            $('.step_box .step_txt').html('사용 불가');
            pw_check = false;

        }else if(pattern4.test(gc_pw)){

            $('.step_box').addClass('safe')
            $('.step_box .step_txt').html('안전');
            pw_check = true;
        }else{

            $('.step_box').addClass('normal')
            $('.step_box .step_txt').html('보통');
            pw_check = true;
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//비밀번호확인체크
//////////////////////////////////////////////////////////////////////////////////////////////////////////
let isCheckPwc= function() {
	let gc_pwc = $('#gc_pwc').val();
	let gc_pw = $('#gc_pw').val();

	if(gc_pw == gc_pwc){
		$('.tip1').css('display','none')
	}else{
		$('.tip1').css('display','block')
	}
	if(gc_pwc == ''){
		$('.tip5').css('display','block')
		$('.tip1').css('display','none')
	}else{
		$('.tip5').css('display','none')
	}
};
function chkContinue(gc_pw){   //연속된 문자, 숫자 체크(3자리)
	 let cnt = 0;
	 let cnt2 = 0;
	 let tmp = "";
	 let tmp2 = "";
	 let tmp3 = "";
	 let same_str = 'N';

	 for(i=0; i<gc_pw.length; i++){
		 tmp = gc_pw.charAt(i);
		 tmp2 = gc_pw.charAt(i+1);
		 tmp3 = gc_pw.charAt(i+2);

		  if(tmp.charCodeAt(0) - tmp2.charCodeAt(0) == 1 && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) == 1){
			  cnt = cnt + 1;
		  }
		  if(tmp.charCodeAt(0) - tmp2.charCodeAt(0) == -1 && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) == -1){
			  cnt2 = cnt2 + 1;
		  }

		  if(tmp.charCodeAt(0) == tmp2.charCodeAt(0) && tmp2.charCodeAt(0) == tmp3.charCodeAt(0)){
			  same_str = 'Y';
		  }
	 }
	 if(cnt > 0 || cnt2 > 0 || same_str == 'Y'){//사용불가
		 return true;
	 }else{
		 return false;
	 }
}
// 닉네임
let nick_db = "";
let nick_check = false; //닉네임체크변수
let is_char = 1; // 공백유무
// 욕,성적 단어 제외 정규표현식
let ff = /^[시씨슈쓔쉬쉽쒸쓉]([0-9]*|[0-9]+ *)[바발벌빠빡빨뻘파팔펄]|[섊좆좇졷좄좃좉졽썅춍]|ㅅㅣㅂㅏㄹ?|ㅂ[0-9]*ㅅ|[ㅄ]|[ㅅㅆ][0-9]*[ㄲㅅㅆㅂ]|[존좉좇][0-9 ]*나|[자보][0-9]+지|보빨|[봊봋봇봈볻봁봍] *[빨이]|[후훚훐훛훋훗훘훟훝훑][장앙]|후빨|[엠앰]창|애[미비]|애자|[^탐]색기|([샊샛세쉐쉑쉨쉒객갞갟갯갰갴겍겎겏겤곅곆곇곗곘곜걕걖걗걧걨걬] *[끼키퀴])|새 *[키퀴]|[병븅]신|미친[가-닣닥-힣]|[믿밑]힌|[염옘]병|[샊샛샜샠섹섺셋셌셐셱솃솄솈섁섂섓섔섘]기|[섹섺섻쎅쎆쎇쎽쎾쎿섁섂섃썍썎썏][스쓰]|지랄|니[애에]미|갈[0-9]*보[^가-힣]|[뻐뻑뻒뻙뻨][0-9]*[뀨큐킹낑)|꼬추|곧휴|[가-힣]슬아치|자박꼼|[병븅]딱|빨통|[사싸](이코|가지|까시)|육시[랄럴]|육실[알얼할헐]|즐[^가-힣]|찌(질이|랭이)|찐따|찐찌버거|창[녀놈]|[가-힣]{2,}충[^가-힣]|[가-힣]{2,}츙|부녀자|화냥년|환[양향]년|호[구모]|조[선센][징]|조센|[쪼쪽쪾]([발빨]이|[바빠]리)|盧|무현|찌끄[레래]기|(하악){2,}|하[앍앜]|[낭당랑앙항남담람암함][ ]?[가-힣]+[띠찌]|느[금급]마|文在|在寅|(?<=[^\n])[家哥]|속냐|[tT]l[qQ]kf|Wls$/;
let isCheckNick = function(){
	let user_nick = $('#user_nick').val();
    if (nick_db != $('input[name=user_nick]').val()) {
        nick_db = $('input[name=user_nick').val();
        $('#nick_info').css('display','none');
        if(user_nick.length < 2 || user_nick.length > 20 ){ // 닉네임 글자수
            nick_check = false;
            // 길이 체크
            $('#nick_able').css('display','none');
            $('#nick_unable').css('display','block');
        }else if(user_nick.substr((user_nick.length-1),1) == '\\'){
            nick_check = false;
            //역슬러시 제한
            $('#nick_able').css('display','none');
            $('#nick_unable').css('display','block');
        }else if(ff.test(user_nick)){
            nick_check = false;
            // 욕,성적 단어 제외
            $('#nick_able').css('display','none');
            $('#nick_unable').css('display','block');
        }else{
            len = user_nick.length;
            for(let i=0; i<len; i++) {
                // 한문공백문자의 charCode값은 32
                if(user_nick.charCodeAt(i) == 32){
                    $('#nick_able').css('display','none');
                    $('#nick_unable').css('display','block');
                    is_char = 0;
                    break;
                }else{
                    is_char = 1;
                }
            }
            if(user_nick && is_char){
                nick_check = true
                $('#nick_able').css('display','block');
                $('#nick_unable').css('display','none');
            }
        }
    }
}
//
let mailList = function(){
	let email_list = $('#email_list').val();
	if (email_list!="" && email_list =="self") {
		$('#email2').val('');
	}else if(email_list!="" && email_list=="inst") {	//직접입력
		$('#email2').val('');
		$('#email2').attr('readOnly',false);
		$('#email2').focus();
		//이메일 직접입력 체크
		$("#email2").keyup(function(){});
	}else{
		$('#email2').attr('readOnly',true);
		$('#email2').val(email_list);
	}
}


let isClicked = false; // 클릭 여부 변수
let isTimerRunning = false; // 타이머 실행 여부 변수
// 이메일 인증코드 전송
let codeSend = function() {
    let email1 = jQuery.trim($('#email1').val()); //이메일1 값
    let email2 = jQuery.trim($('#email2').val()); //이메일2 값

	if (typeof(email1) === 'undefined' || email1 === '' ||
        typeof(email2) === 'undefined' || email2 === '') {
        alert('이메일을 입력해 주세요.');
        $('#email1').focus();
        return false;
    }

	let email = email1 + "@" + email2;
	let jsonData = {"member_email":email};
	if(isClicked){
	    return false;
	}
	if (isTimerRunning) { // 타이머 실행 중이면 코드 재전송 막기
        return false;
    }
	isClicked = true;
	$.ajax({
        type : "get",
        url : '/GCInside/member/checkEmail',
        data : jsonData,
        success : function(data){ // DB에 이메일 존재하는지 확인
            if(data.result === 'success'){
                alert('이미 사용중인 이메일입니다.');
                isClicked = false;
            }else{
             isClicked = true; // 중복클릭방지
             $.ajax({
                 url: '/GCInside/member/sendEmailCode',
                 type: 'POST',
                 data: {email: email},
                 success: function(response) {
                     alert('인증코드가 전송되었습니다.');
                     isClicked = true; // 클릭 여부 변수를 true 로 변경, 중복 클릭 방지
                     // 인증코드 전송 완료 후 5분 타이머 시작
                     let limitTime = 5 * 60; // 제한시간 5분
                     let countdownTime = setInterval(function(){
                         if(limitTime <= 0){
                             clearInterval(countdownTime); // 타이머 종료
                             $('#time_text').text('인증 코드를 재발급받아주세요.');
                             isTimerRunning = false;
                         }
                         let minute = Math.floor(limitTime / 60);
                         let second = limitTime % 60;
                         $('#time_text').text(minute + '분' + second + '초 남았습니다.');
                         $('#time_text').show();
                         limitTime--;
                         }, 1000);

                         isTimerRunning = true; // 타이머변수 중복클릭방지
                         setTimeout(function(){ // 타이머 종료 후 코드 재전송 클릭여부 변수 재설정
                             isClicked = false;
                             isTimerRunning = false;
                         }, limitTime * 1000);
                 },
                 error: function(error) {
                     alert('인증코드 전송에 실패했습니다.');
                     isClicked = false;
                 },
                 complete:function(){ // ajax 호출 완료후에 클릭여부 재설정
                     isClicked = false;
                 }
             });
           }
         }
    });
};

// 이메일 인증코드값 확인
let AuthCode = function() {
    let code = jQuery.trim($('#code').val());  // 입력한 인증코드
    if(typeof(code) == 'undefined' || code == '') {
        alert('인증코드를 입력해 주세요.');
        $('#code').focus();
        return false;
    }
    $.ajax({
        url : '/GCInside/member/AuthCode',
        type : 'POST',
        data : {code : code},// 인증코드 값
        success : function(result) {
            if(result == 'success') {
                alert('인증되었습니다.'); // 인증 성공 시 처리할 코드 작성
            } else {
                alert('인증코드가 일치하지 않습니다.');
            }
        },
        error : function(xhr) {
            if(xhr.responseText == 'fail'){
                alert('인증코드가 일치하지 않습니다.');
            }else{
                alert('오류가 발생하였습니다.');
            }
        }
    });
}

// 폼 전송
function Recheck(){
    // 모든 필드가 채워져 있는지 확인
    let member_uid = $('#member_uid').val();
    let gc_pw = $('#gc_pw').val();
    let gc_pwc = $('#gc_pwc').val();
    let user_nick = $('#user_nick').val();
    let email1 = $('#email1').val();
    let email2 = $('#email2').val();
    let code = $('#code').val();
    let v = grecaptcha.getResponse(); // 자동입력방지값

    if(member_uid == ""){alert('아이디를 입력해주세요.');return false;}
    if(gc_pw == ""){alert('비밀번호를 입력해주세요.');return false;}
    if(gc_pwc == ""){alert('비밀번호를 재입력해주세요.');return false;}
    if(user_nick == ""){alert('닉네임을 입력해주세요.');return false;}
    if(gc_pw != gc_pwc){alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');return false;}
    if(email1 == ""){alert('이메일을 입력해주세요.');return false;}
    if(email2 == ""){alert('이메일을 입력해주세요.');return false;}
    if(code == ""){alert('인증코드를 입력해주세요.');return false;}
    if(v.length == 0){alert("'자동 입력 방지'를 체크해주세요.");return false;}
    return true;
};

// 아이디 찾기
let member_emailResult = function(){
    if(!$("#member_email").val()) {
        alert("이메일을 입력해 주세요.");
        $("#member_email").focus();
        return false;
    }
    let member_email = $('#member_email').val();
    let jsonData = {"member_email" : member_email};
    $.ajax({
        type : "get",
        url : '/GCInside/member/checkEmail',
        data : jsonData,
        success : function(data){ // DB에 이메일 존재하는지 확인
            if(data.result === 'fail'){
                alert('입력한 이메일을 찾을수없습니다.');
            }else{
                $.ajax({ // 입력한 이메일이 맞을때 이메일 보내기
                    type : "post",
                    url : '/GCInside/member/sendIdCode',
                    data : jsonData,
                    success : function(data) {
                        alert("아이디가 해당 이메일로 발송되었습니다.");
                        location.href = "/GCInside/member/login";
                    },
                    error : function(e) {
                        alert("아이디 발송에 실패했습니다. 다시 시도해 주세요.");
                    }
                });
            }
        }
    });
};

// 2023-03-23  전인준
// 여러개의 ajax 통신시 promise객체 활용하면 코드도 간결해지고 가독성도 좋아짐
// 비밀번호 재설정 //// resolve(성공),reject(실패) 파라미터
let password_resetResult = function() {
event.preventDefault(); // 유효성검사되기전에 폼전송 방지
let member_uid = $('#member_uid').val();
let member_email = $('#member_email').val();

// 입력 체크
if (!member_uid) {alert("아이디를 입력해 주세요.");$("#member_uid").focus();return false;}
if (!member_email) {alert("이메일을 입력해 주세요.");$("#member_email").focus();return false;}
// DB 아이디 조회
function checkUid() {
    return new Promise(function(resolve, reject) {
    let jsonData = {"member_uid": member_uid};
    $.ajax({
        type: "GET",
        url: "/GCInside/member/checkUid",
        data: jsonData,
        success: function(data) {
          if (data.result === "success") {
            reject('입력한 아이디가 존재하지 않습니다.');
          } else {
            resolve();
          }
        },
        error: function(e) {
          reject('서버 에러 발생');
        }
        });
    });
}

// DB 이메일 조회
function checkEmail() {
    return new Promise(function(resolve, reject) {
      let jsonData = {"member_email": member_email};
      $.ajax({
        type: "GET",
        url: '/GCInside/member/checkEmail',
        data: jsonData,
        success: function(data) {
          if (data.result === 'success') {
            resolve();
          } else {
            reject('입력한 이메일이 존재하지 않습니다.');
          }
        },
        error: function(e) {
          reject('서버 에러 발생');
        }
      });
    });
}


// promise 실행순서 .then 진행 , .catch 오류시
      checkUid()
      .then(function() {
        return checkEmail();
      })
      .then(function() {
        // 여기서 reset_pwd는 폼의 name
        // 아이디, 이메일 유효성 검사가 모두 통과한 경우 폼 전송
        document.reset_pwd.submit();
      })
      .catch(function(error) {
        alert(error);
      });
  };

// 2023-03-24 // 전인준
// 비밀번호 재설정시 유효성 검사
function password_reset_update(){
pw_check = false; //비밀번호체크
let member_pass = $('#member_pass').val(); // 변경할 비밀번호
let member_pass1 = $('#member_pass1').val(); // 재입력
// 입력 체크
    if (!member_pass) {
    alert("변경하실 비밀번호를 입력해 주세요.");
    $("#member_pass").focus();
    return false;
    }
    if (!member_pass1) {
    alert("변경하실 비밀번호를 재입력해 주세요.");
    $("#member_pass1").focus();
    return false;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,20}$/.test(member_pass1)) {
    alert("비밀번호는 8~20자리로 영문,숫자,특수문자로 구성되어야 합니다.");
    $("#member_pass").focus();
    return false;
    }
    if (member_pass !== member_pass1) {
    alert("변경하실 비밀번호가 일치하지 않습니다.");
    $("#member_pass1").focus();
    return false;
    }
pw_check = true;
}