# Complementary Color Finder

Find the complementary color with ease.\
보색을 간단하게 찾을 수 있는 사이트 (~제작중)

## 기능

### 색상 선택 및 보색 매칭
<img src="https://github.com/user-attachments/assets/0b64328c-4084-4ad6-82ba-3e1e32ed6d7a">
<ul>
  <li>색상 선택기에서 색을 선택할 수 있습니다.</li>
  <li>선택한 색상에 따라 배경색이 변경되고 보색이 계산되어 보색 섹션의 배경색도 변경됩나다.</li>
  <li>밝기 대비를 기준으로 텍스트 색이 검은색 또는 흰색으로 자동 변경됩니다.</li>
  <li>선택한 색상과 보색의 hex값과 rgb값, 색상 이름이 표시됩니다.(근사치 색상 이름 제공)</li>
  <li></li>
</ul>

### 텍스트 샘플
<ul>
  <li>섹션에 텍스트 샘플을 포함하였습니다.</li>
    <ul>
      <li>알파벳 대소문자와 긴 단락 텍스트</li>
      <li>섹션의 글자들은 AOS typo 가이드를 참고하여 차례로 96px, 60px, 48px, 34px, 24px, 20px로 설정하였습니다.</li>
    </ul>
</ul>

### 글꼴 설정
<img src="https://github.com/user-attachments/assets/afc046c2-df33-41d4-a8f9-86791438d16f">
<ul>
  <li>샘플 글꼴 목록을 제공합니다.글꼴을 선택하면 두 섹션 모두에 적용됩니다.</li>
</ul>

## 기술 스택

<ul>
  <li>React.js</li>
  <li>SCSS</li>
  <li>find color name : 
    <a href="https://www.npmjs.com/package/color-name-list">color-name-list</a>,
    <a href="https://github.com/dtao/nearest-color">nearest-color</a>
  </li>
</ul>

## 추가 예정 기능

<ul>
  <li>회원가입 및 로그인</li>
  <li>스크랩</li>
  <li>해당 조합 이미지 저장</li>
</ul>
