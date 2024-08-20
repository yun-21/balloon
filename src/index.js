const root = document.getElementById('root');
const init = [];

document.getElementById('startButton').addEventListener('click', function() {
  this.style.display = 'none';

  for (let i = 0; i < 20; i++) {
      createFloatingDiv();
  }

  // 5초 후에 게임 종료
  setTimeout(endGame, 5000);
});

function createFloatingDiv() {
  const balloon = document.createElement('div');
  balloon.classList.add('floatingDiv');

  // 브라우저의 너비와 높이를 가져옴
  const viewportWidth = window.innerWidth;

  // 풍선의 위치와 애니메이션 시간을 랜덤하게 설정
  const randomLeft = Math.random() * (viewportWidth - 50); // 50px는 div의 너비
  const randomBottom = 0; // 하단에서 시작
  const randomDuration = Math.random() * 3 + 1; // 1초에서 5초 사이의 랜덤 시간

  // 풍선에 랜덤 위치와 애니메이션 시간 설정
  balloon.style.left = `${randomLeft}px`;
  balloon.style.bottom = `${randomBottom}px`;
  balloon.style.animationDuration = `${randomDuration}s`;

  balloon.addEventListener('click', function() {
    const randomMsg = getRandomMessage()
    balloon.textContent = randomMsg;
      init.push(randomMsg);
      setTimeout(() => {
        balloon.remove();
      }, 1000);
  });

  balloon.addEventListener('animationend', function() {
    balloon.remove();
  });

  root.appendChild(balloon);
}

function endGame() {
  // 게임이 끝난 즉시 풍선 제거
  const allDivs = document.querySelectorAll('.floatingDiv');
  allDivs.forEach(balloon => balloon.remove());

  ending();
}

const ending = () => {
  // 게임 끝날때 뽑은 쪽지 토대로 엔딩멘트
  const div = document.createElement('div');
  div.classList.add('endingDiv');
  root.appendChild(div);
  if(init.includes('1등')===true){
    div.innerHTML = `<h2>축하합니다! 1등에 당첨되셨네요!</h2><h4>당신이 어디에 소속되어있든 1일 휴가권을 드릴게요~</h4><h6>단, 평일에는 사용 못함</h6>`;
  } else if(init.includes('2등')===true){
    div.innerHTML = `<h2>축하합니다! 2등에 당첨되셨네요!</h2><h4>여행을 갈때 간편하게 가져갈 수 있는 여행용 키트를 드릴게요~</h4><h6>무려, 5성급 호텔에서 슬쩍 가져온 샘플들!</h6>`;
  } else if(init.includes('3등')===true){
    div.innerHTML = `<h2>축하합니다! 3등에 당첨되셨네요!</h2><h4>3등 이라는 것만으로도 충분한 기쁨이 되지않으시련지?ㅎㅎ</h4>`;
  } else {
    div.innerHTML = `<h2>아.. 어찌 다 꽝이 걸리셨는지.. 화이팅요^^7</h2>`
  }
}

const probabilities = [
  { message: "꽝", probability: 87 },
  { message: "1등", probability: 2 },
  { message: "2등", probability: 4 },
  { message: "3등", probability: 7 }
];

// 랜덤 쪽지
const getRandomMessage = () => {
  // 총 1부터 100까지 랜덤
  const random = Math.random() * 99 + 1;
  let cumulative = 0;
  // for과 동일함 probabilities[0]부터 [3]까지 순회하며 cumulative에 확률 저장
  for (const key of probabilities) {
      cumulative += key.probability;
      if (random < cumulative) {
          return key.message;
      }
  }
}
