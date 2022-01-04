앱 서명하는 법
참조 : https://www.electron.build/code-signing

아래 환경 변수의 설정이 필요
CSC_LINK - pfx 파일 경로
CSC_KEY_PASSWORD - pfx 파일 비밀번호

ex)
Windows

cmd > setx CSC_LINK *.pfx 
cmd > setx CSC_KEY_PASSWORD password123

*Windows의 경우 WIN_CSC_LINK/WIN_CSC_KEY_PASSWORD도 사용 가능
