---
slug: how-to-fix-vcruntime140.dll-not-found-when-open-TikMatrix
title: TikMatrix 열 때 vcruntime140.dll을 찾을 수 없음 오류 해결 방법
authors: tikMatrix
tags: [vcruntime140.ddl을 찾을 수 없음, 해결됨, tikmatrix]
---

"vcruntime140.dll을 찾을 수 없음" 오류는 일반적으로 Microsoft Visual C++ 재배포 가능 패키지가 설치되지 않았거나 손상되었기 때문에 발생합니다. 다음은 이 문제를 해결하는 단계입니다:
<!--truncate-->
---

1. **Microsoft Visual C++ 재배포 가능 패키지 다운로드**:
   - [Microsoft Visual C++ 재배포 가능 패키지 다운로드 페이지](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads)로 이동합니다.
   - 시스템에 적합한 버전을 다운로드합니다 (일반적으로 최신 컴퓨터의 경우 64비트 버전이지만 애플리케이션이 특별히 요구하는 경우 32비트 버전이 필요할 수 있습니다).

2. **재배포 가능 패키지 설치**:
   - 다운로드한 설치 프로그램을 실행하고 화면의 지시에 따라 설치합니다.
   - 이미 설치되어 있는 경우 설치 프로세스 중에 "복구" 옵션을 선택하여 설치를 복구할 수 있습니다.

3. **컴퓨터 재시작**:
   - 패키지를 설치하거나 복구한 후 컴퓨터를 재시작하여 모든 변경 사항이 적용되도록 합니다.

4. **업데이트 확인**:
   - Windows가 최신 상태인지 확인하세요. `설정 > 업데이트 및 보안 > Windows Update`로 이동하여 업데이트를 확인하세요.

5. **TikMatrix 재설치**:
   - 위의 단계가 작동하지 않으면 TikMatrix를 제거한 다음 다시 설치해 보세요. 공식 웹사이트에서 최신 버전을 다운로드해야 합니다.

이러한 단계를 시도한 후에도 오류가 지속되면 시스템 파일 검사기 도구를 실행하여 손상된 시스템 파일과 같은 추가 문제를 확인해야 할 수 있습니다:

1. **시스템 파일 검사기(SFC) 실행**:
   - 명령 프롬프트를 관리자로 엽니다 (시작 버튼을 마우스 오른쪽 버튼으로 클릭하고 "명령 프롬프트(관리자)" 또는 "Windows PowerShell(관리자)" 선택).
   - `sfc /scannow`를 입력하고 Enter를 누릅니다.
   - 프로세스가 완료될 때까지 기다립니다. SFC가 문제를 발견하면 해결을 시도합니다.

이러한 단계는 "vcruntime140.dll을 찾을 수 없음" 오류를 해결하고 TikMatrix가 제대로 실행되도록 하는 데 도움이 됩니다.
